import GameScene from './GameScene'
import BoardContainer from '../components/BoardContainer/BoardContainer'
import * as TWEEN from '@tweenjs/tween.js'
import {get} from 'svelte/store'

import type {IScene} from '../Manager'
import {gameStatesStore, roomStore} from '$lib/stores/multiplayerStore'
import type {GameStateDTO} from '@jmischler72/core-tetris'

export default class MultiPlayerGameScene extends GameScene implements IScene {
	private readonly playerBoard: BoardContainer
	private readonly oppBoard: BoardContainer
	private isGameOver: boolean = false

	constructor() {
		super()

		this.playerBoard = new BoardContainer()
		this.oppBoard = new BoardContainer()
		this.oppBoard.position.set(
			this.playerBoard.x + this.playerBoard.width,
			this.playerBoard.y
		)
		this.addChild(this.playerBoard, this.oppBoard)

		this.playerBoard.renderPlayerBorder()
	}

	update(): void {
		this.stats.begin()
		TWEEN.update()

		const gameStates: Map<string, GameStateDTO> = get(gameStatesStore)

		if (gameStates && !this.isGameOver) {
			gameStates.forEach((value: GameStateDTO, key: string) => {
				if (key === get(roomStore)?.sessionId) {
					this.playerBoard.updatePlayerBoard(value)
				} else {
					this.oppBoard.updatePlayerBoard(value)
				}
				// if (gameState.isGameOver) {
				//     this.isGameOver = true;
				//     if (key == socketId) {
				//         this.playerBoard.gameOverAnimation();
				//     } else {
				//         this.oppBoard.gameOverAnimation();
				//     }
				// }
			})
		}

		this.stats.end()
	}

	resize(screenWidth: number, screenHeight: number): void {
		const GAMES_CONTAINER_GAP: number = 60

		this.playerBoard.position.set(
			screenWidth / 2 -
				this.playerBoard.width / 2 -
				this.oppBoard.width / 2 -
				GAMES_CONTAINER_GAP,
			screenHeight / 2 - this.playerBoard.height / 2
		)

		this.oppBoard.position.set(
			screenWidth / 2 -
				this.oppBoard.width / 2 +
				this.playerBoard.width / 2 +
				GAMES_CONTAINER_GAP,
			screenHeight / 2 - this.oppBoard.height / 2
		)
	}
}
