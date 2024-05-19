import { PlayerState, RoomOptions, getDeletedLines, zFirstGameModeOptions } from '@jmischler72/shared';
import { FirstGameModeRoomState, getOpponents } from '@jmischler72/shared';
import { BaseRoom } from './BaseRoom';
import { ActionsEnum, GAME_SPEED } from '@jmischler72/core';
import { Delayed } from 'colyseus';
import { FirebaseService } from '../utils/firebase/FirebaseService';
import { findWinner } from '../utils/utils';

export class RoyaleGameModeRoom extends BaseRoom<FirstGameModeRoomState> {
	private gameTimer: Delayed;
	maxClients = 10;

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
		if (this.checkIfCanStartGame(3)) return;

		const seed = Date.now();
		this.logger.debug(seed);
		this.state.players.forEach((player: PlayerState) => {
			player.ready = false;
			player.createGame(seed);
		});

		this.gameTimer = this.clock.setInterval(() => {
			this.state.players.forEach((player: PlayerState, key: string) => {
				this.handlePlayerAction(player, ActionsEnum.GO_DOWN);
			});
		}, GAME_SPEED);
	}

	protected stopGame() {
		super.stopGame();

		if (this.gameTimer) this.gameTimer.clear();

		let winner = findWinner(this.state.players);
		this.logger.info(winner ? 'winner in room: ' + winner.username : 'no winner');

		let opponents = getOpponents(winner, this.state.players);

		if (!winner) return;
		this.state.winner = winner.username;
		if (this.state.winner && !opponents.find((opp) => opp.isAnonymous))
			FirebaseService.increaseWinsForUser(winner.userId);
	}

	protected handlePlayerAction(player: PlayerState, data: ActionsEnum) {
		if (!this.state.isPlaying) return;

		let prevLinesId = structuredClone(Array.from(player.gameState.linesId));

		super.handlePlayerAction(player, data);

		let linesToAdd = getDeletedLines(prevLinesId, Array.from(player.gameState.linesId)).length;

		if (this.state.opponentAttacking) {
			let opponent = getOpponents(player, this.state.players)[0];

			if (opponent) {
				opponent.gameState.gameInstance.addLines(linesToAdd);
				opponent.gameState.updateFromGameStateDTO();
			}
		}

		if (player.gameState.isGameOver || player.gameState.score >= this.state.goalScore) this.stopGame();
	}
}
