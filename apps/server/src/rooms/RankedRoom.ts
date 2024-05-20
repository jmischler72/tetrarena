import {
	GameModeEnum,
	PlayerState,
	RoomOptions,
	RoomState,
	getDefaultGameMode,
	getDeletedLines,
	zFirstGameModeOptions,
} from '@jmischler72/shared';
import { getOpponents } from '@jmischler72/shared';
import { BaseRoom } from './BaseRoom';
import { ActionsEnum, GAME_SPEED } from '@jmischler72/core';
import { Delayed } from 'colyseus';
import { FirebaseService } from '../utils/firebase/FirebaseService';
import { findWinner } from '../utils/utils';

export class RankedRoom extends BaseRoom {
	private gameTimer: Delayed;

	onCreate() {
		const roomOptions: RoomOptions = {
			name: '',
			icon: '',
			gameMode: GameModeEnum.First,
			gameOptions: {
				goalScore: 100,
				opponentAttacking: true,
			},
		};

		super.onCreate(roomOptions);
		this.logger.info('created ranked room');
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
				this.handlePlayerAction(player, ActionsEnum.GO_DOWN);
			});
		}, GAME_SPEED);
	}

	protected stopGame() {
		super.stopGame();

		if (this.gameTimer) this.gameTimer.clear();

		let winner = findWinner(this.state.players);
		this.logger.info(winner ? 'winner in room: ' + winner.username : 'no winner');

		let opponent = getOpponents(winner, this.state.players)[0];

		if (!winner) return;
		this.state.winner = winner.username;

		console.log(this.state.winner);
		// if (this.state.winner && !opponent.isAnonymous) FirebaseService.increaseWinsForUser(winner.userId);
	}

	protected handlePlayerAction(player: PlayerState, data: ActionsEnum) {
		if (!this.state.isPlaying) return;

		let prevLinesId = structuredClone(Array.from(player.gameState.linesId));

		super.handlePlayerAction(player, data);

		let linesToAdd = getDeletedLines(prevLinesId, Array.from(player.gameState.linesId)).length;

		if (this.metadata.gameOptions.opponentAttacking) {
			let opponent = getOpponents(player, this.state.players)[0];

			if (opponent) {
				opponent.gameState.gameInstance.addLines(linesToAdd);
				opponent.gameState.updateFromGameStateDTO();
			}
		}

		if (player.gameState.isGameOver || player.gameState.score >= this.metadata.gameOptions.goalScore) this.stopGame();
	}
}
