import { RoomOptions } from '@jmischler72/shared';
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
		this.state.goalScore = options.gameMode.options.goalScore;
		this.logger.debug('setting metadata' + options.gameMode.options.goalScore);
	}

	protected startGame() {
		super.startGame();
		if (!this.state.isPlaying) return;

		const seed = Date.now();
		this.state.players.forEach((player) => {
			player.ready = false;
			player.createGame(seed);
		});

		this.gameTimer = this.clock.setInterval(() => {
			this.state.players.forEach((player) => {
				player.handleAction(ActionsEnum.GO_DOWN);
				if (player.gameState.isGameOver || player.gameState.score >= this.state.goalScore) this.stopGame();
			});
		}, GAME_SPEED);
	}

	protected stopGame() {
		super.stopGame();

		if (this.gameTimer) this.gameTimer.clear();

		this.state.winner = findWinner(this.state.players);
		if (this.state.winner) FirebaseService.increaseWinsForUser(this.state.players.get(this.state.winner).userId);

		this.logger.info('winner in room: ' + this.state.winner);
	}
}
