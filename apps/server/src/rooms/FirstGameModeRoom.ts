import { PlayerState, RoomOptions, zFirstGameModeOptions } from '@jmischler72/shared';
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
		this.logger.debug('setting metadata' + options.gameOptions.goalScore);
	}

	protected startGame() {
		super.startGame();
		if (!this.state.isPlaying) return;

		const seed = Date.now();
		this.state.players.forEach((player: PlayerState) => {
			player.ready = false;
			player.createGame(seed);
		});

		this.gameTimer = this.clock.setInterval(() => {
			this.state.players.forEach((player: PlayerState) => {
				player.handleAction(ActionsEnum.GO_DOWN);
				if (player.gameState.isGameOver || player.gameState.score >= this.state.goalScore) this.stopGame();
			});
		}, GAME_SPEED);
	}

	protected stopGame() {
		super.stopGame();

		if (this.gameTimer) this.gameTimer.clear();

		let winner = findWinner(this.state.players);
		this.state.winner = winner.username;
		if (this.state.winner) FirebaseService.increaseWinsForUser(winner.userId);

		this.logger.info('winner in room: ' + this.state.winner);
	}
}
