import GameScene from './GameScene';
import BoardContainer from '../components/BoardContainer/BoardContainer';
import * as TWEEN from '@tweenjs/tween.js';
import { get } from 'svelte/store';

import type { IScene } from '../Manager';
import { roomStore } from '$lib/stores/MultiplayerStore';
import type { GameStateDTO } from '@jmischler72/core';

export default class MultiPlayerGameScene extends GameScene implements IScene {
	private readonly playerBoard: BoardContainer;
	private readonly oppBoard: BoardContainer;

	constructor(playerName: string, oppName: string) {
		super();

		this.playerBoard = new BoardContainer(playerName);
		this.oppBoard = new BoardContainer(oppName);
		this.oppBoard.position.set(this.playerBoard.x + this.playerBoard.width, this.playerBoard.y);
		this.addChild(this.playerBoard, this.oppBoard);

		this.playerBoard.renderPlayerBorder();
	}

	updatePlayerBoard(key: string, gameState: GameStateDTO): void {
		const boardToUpdate = key === get(roomStore)?.sessionId ? this.playerBoard : this.oppBoard;
		boardToUpdate.updatePlayerBoard(gameState);
	}

	renderDisconnectOverlayForBoard(key: string, connected: boolean): void {
		const boardToUpdate = key === get(roomStore)?.sessionId ? this.playerBoard : this.oppBoard;
		boardToUpdate.renderDisconnectOverlay(connected);
	}

	update(): void {
		this.stats.begin();
		TWEEN.update();

		this.stats.end();
	}

	resize(screenWidth: number, screenHeight: number): void {
		const ratio = Math.min(screenWidth / 1000, screenHeight / 900);
		const GAMES_CONTAINER_GAP = 80 * ratio;

		this.playerBoard.scale.set(ratio);
		this.oppBoard.scale.set(ratio);

		this.playerBoard.position.set(
			screenWidth / 2 - this.playerBoard.width / 2 - this.oppBoard.width / 2 - GAMES_CONTAINER_GAP,
			screenHeight / 2 - this.playerBoard.height / 2 + 20,
		);

		this.oppBoard.position.set(
			screenWidth / 2 - this.oppBoard.width / 2 + this.playerBoard.width / 2 + GAMES_CONTAINER_GAP,
			screenHeight / 2 - this.oppBoard.height / 2 + 20,
		);
	}
}
