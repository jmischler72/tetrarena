import { GameModeEnum, PlayerState, RoomOptions, getDeletedLines } from '@jmischler72/shared';
import { getOpponents } from '@jmischler72/shared';
import { BaseRoom } from './BaseRoom';
import { ActionsEnum, GAME_SPEED } from '@jmischler72/core';
import { Client, Delayed } from 'colyseus';
import { findWinner } from '../utils/utils';
import { FirebaseService } from '../utils/firebase/FirebaseService';

export class RankedRoom extends BaseRoom {
	private gameTimer: Delayed;

	onJoin(client: Client<any, any>): void {
		super.onJoin(client);
		this.state.admin = '';
	}

	protected startGame() {
		super.startGame();
		if (!this.state.isPlaying || this.state.isCompleted) return;

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

		this.state.isCompleted = true;

		if (this.gameTimer) this.gameTimer.clear();

		let winner = findWinner(this.state.players);
		this.logger.info(winner ? 'winner in room: ' + winner.username : 'no winner');

		let opponent = getOpponents(winner, this.state.players)[0];

		if (!winner) return;
		this.state.winner = winner.username;

		FirebaseService.updateRankForUser(winner.userId, 10);
		FirebaseService.updateRankForUser(opponent.userId, -10);
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
