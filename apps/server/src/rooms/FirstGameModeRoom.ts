import { PlayerState, RoomOptions, getDeletedLines, zFirstGameModeOptions } from '@jmischler72/shared';
import { FirstGameModeRoomState } from '@jmischler72/shared';
import { BaseRoom } from './BaseRoom';
import { ActionsEnum, GAME_SPEED } from '@jmischler72/core';
import { Delayed } from 'colyseus';
import { FirebaseService } from '../utils/firebase/FirebaseService';
import { findWinner } from '../utils/utils';

export class FirstGameModeRoom extends BaseRoom<FirstGameModeRoomState> {
	private gameTimer: Delayed;

	onCreate(options: RoomOptions) {
		this.setState(new FirstGameModeRoomState());
		super.onCreate(options);
	}

	protected setRoomMetadata(options: RoomOptions) {
		super.setRoomMetadata(options);
		zFirstGameModeOptions.parse(options.gameOptions);
		this.state.goalScore = options.gameOptions.goalScore;
		this.state.opponentAttacking = options.gameOptions.opponentAttacking;

		this.logger.debug('setting metadata for first');
	}

	protected startGame() {
		super.startGame();
		if (!this.state.isPlaying) return;

		const seed = Date.now();
		this.logger.debug(seed);
		this.state.players.forEach((player: PlayerState) => {
			player.ready = false;
			player.createGame(seed);
		});

		this.gameTimer = this.clock.setInterval(() => {
			this.state.players.forEach((player: PlayerState, key: string) => {
				this.handlePlayerInput(player, ActionsEnum.GO_DOWN);
			});
		}, GAME_SPEED);
	}

	protected stopGame() {
		super.stopGame();

		if (this.gameTimer) this.gameTimer.clear();

		let winner = findWinner(this.state.players);
		this.logger.info(winner ? 'winner in room: ' + winner.username : 'no winner');

		if (!winner) return;
		this.state.winner = winner.username;
		if (this.state.winner) FirebaseService.increaseWinsForUser(winner.userId);
	}

	protected handlePlayerInput(player: PlayerState, data: ActionsEnum) {
		let prevLinesId = structuredClone(Array.from(player.gameState.linesId));

		super.handlePlayerInput(player, data);

		let linesToAdd = getDeletedLines(prevLinesId, Array.from(player.gameState.linesId)).length;

		if (this.state.opponentAttacking) {
			let opps: PlayerState[] = [];
			this.state.players.forEach((otherPlayer) => {
				if (player !== otherPlayer) opps.push(otherPlayer);
			});

			if (opps[0]) {
				opps[0].gameState.gameInstance.addLines(linesToAdd);
				opps[0].gameState.updateFromGameStateDTO();
			}
		}

		if (player.gameState.isGameOver || player.gameState.score >= this.state.goalScore) this.stopGame();
	}
}
