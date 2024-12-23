import * as PIXI from 'pixi.js';
import Board from '../Board/Board';
import { currentPlayerBorderTween, placedTetriminosTween, scoreAnimationTween } from './BoardContainerAnimation';
import NextTetriminosContainer from './NextTetriminosContainer/NextTetriminosContainer';
import { type GameStateDTO } from '@jmischler72/core';
import { getDeletedLines } from '@jmischler72/shared';
import DisconnectedOverlay from './DisconnectedOverlay';

export default class BoardContainer extends PIXI.Container {
	private readonly board: Board;
	private overlay: DisconnectedOverlay | null = null;
	private readonly scoreText: PIXI.Text;
	private readonly nextTetriminosContainer: NextTetriminosContainer;
	private currentGameState: GameStateDTO | null = null;
	private initialPosition: number | null = null;

	constructor(name?: string) {
		super();
		this.sortableChildren = true;

		this.board = new Board();

		this.scoreText = new PIXI.Text('0', {
			fontSize: 30,
			fontFamily: "'Press Start 2P', cursive",
			fill: 0xffffff,
			align: 'center',
		});
		this.scoreText.anchor.set(0.5, 0.5);

		this.scoreText.position.set(this.board.width / 2, -20);
		this.scoreText.zIndex = 2;

		this.nextTetriminosContainer = new NextTetriminosContainer();
		this.nextTetriminosContainer.position.set(this.board.width + 10, 0);

		this.addChild(this.board, this.scoreText, this.nextTetriminosContainer);

		if (name) {
			const nameText = new PIXI.Text('0', {
				fontSize: 15,
				fontFamily: "'Press Start 2P', cursive",

				fill: 0x5c5c5c,
				align: 'center',
			});

			nameText.text = name;

			nameText.position.set(this.board.width / 2 - nameText.width / 2, this.board.height + 10);
			this.addChild(nameText);
		}
	}

	renderDisconnectOverlay(connected: boolean) {
		if (!connected) {
			if (this.overlay) return;
			this.overlay = new DisconnectedOverlay(this.board);
			this.addChild(this.overlay);
		} else {
			if (this.overlay) {
				this.removeChild(this.overlay);
				this.overlay = null;
			}
		}
	}

	renderPlayerBorder() {
		const graphics = new PIXI.Graphics();
		graphics.beginFill('rgba(0,0,0,0)');
		// set the line style to have a width of 5 and set the color to red
		graphics.lineStyle(3, 0xff0000);
		graphics.alpha = 0.3;
		// draw a rectangle
		graphics.drawRect(0, 0, this.width, this.board.height);
		graphics.zIndex = 1;

		this.addChild(graphics);

		currentPlayerBorderTween(graphics).start();
	}

	updatePlayerBoard(gameState: GameStateDTO) {
		if (this.currentGameState != null && JSON.stringify(gameState) === JSON.stringify(this.currentGameState)) {
			return;
		}

		this.renderAnimations(gameState);

		this.board.updateFromBoard(gameState.board);

		this.board.updateTetrimino(gameState.shadowTetrimino, gameState.currentTetrimino.color, true);
		this.board.updateTetrimino(gameState.currentTetrimino, gameState.currentTetrimino.color);

		this.nextTetriminosContainer.renderTetriminoContainers(gameState.nextTetriminos);
		this.currentGameState = JSON.parse(JSON.stringify(gameState));
	}

	private renderAnimations(gameState: GameStateDTO) {
		if (!this.currentGameState) return;

		let offset = 10;
		getDeletedLines(this.currentGameState?.linesId, gameState.linesId).forEach((line) => {
			offset = 20;
			this.board.animateLineBreak(line);
		});

		// for (let i = 0; i < getAddedLines(this.currentGameState?.linesId, gameState.linesId); i++) {
		// 	this.board.animateNewLine(gameState.board[BOARD_HEIGHT - 1], gameState.currentTetrimino.id !== this.currentGameState?.currentTetrimino.id, this.currentGameState.currentTetrimino.position_y);
		// }

		if (gameState.currentTetrimino.id !== this.currentGameState?.currentTetrimino.id) {
			this.posedAnimation(offset);
		}
		if (gameState.score != parseInt(this.scoreText.text)) {
			this.scoreAnimation(gameState.score);
		}
	}

	private posedAnimation(offset: number) {
		if (!this.initialPosition) this.initialPosition = this.position.y;
		placedTetriminosTween(this, this.initialPosition, offset).start();
	}

	private scoreAnimation(score: number) {
		scoreAnimationTween(this.scoreText)
			.onStart(() => {
				this.scoreText.text = score;
				this.scoreText.style.fill = 0xffff00;
				setTimeout(() => (this.scoreText.style.fill = 0xffffff), 300);
			})
			.start();
	}
}
