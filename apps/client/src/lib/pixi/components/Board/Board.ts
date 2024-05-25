import * as PIXI from 'pixi.js';
import { ColorEnum, type Tetrimino } from '@jmischler72/core';
import { COLORS } from '../../consts';
import { getBlocksTexturesFromCache } from '../../TextureLoader';
import { fallingSpriteTween } from './BoardAnimation';
import { copySprite, createBlockSprite } from '$lib/pixi/helpers/BlockHelpers';
import TetriminoContainer from '../Tetrimino/TetriminoContainer';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 35;

/**
 * Render board using PIXI.js
 */
export default class Board extends PIXI.Container {
	private readonly textures: PIXI.Texture[];
	private board: PIXI.Sprite[][] = [];
	private tetrimino: TetriminoContainer | null = null;
	private shadowTetrimino: TetriminoContainer | null = null;

	constructor() {
		super();
		this.sortableChildren = true;

		this.textures = getBlocksTexturesFromCache();

		this.renderBoardSprites();

		this.renderBackground();
		this.renderGrid();
	}

	private renderBackground() {
		const board_bg = new PIXI.Graphics();
		board_bg.beginFill(0x3b3b3b);
		board_bg.drawRect(0, 0, this.width, this.height);
		board_bg.zIndex = -2;
		board_bg.position.set(0, 0);

		this.addChild(board_bg);
	}

	private renderBoardSprites() {
		for (let i = 0; i < BOARD_HEIGHT; ++i) {
			const row: PIXI.Sprite[] = [];
			for (let j = 0; j < BOARD_WIDTH; ++j) {
				const spr = createBlockSprite(i, j, this.textures[0], BLOCK_SIZE);
				this.addChild(spr);
				row.push(spr);
			}
			this.board.push(row);
		}
	}

	private renderGrid() {
		const grid = new PIXI.Graphics();
		grid.lineStyle(1, 0x54555c, 0.8);
		grid.zIndex = -1;

		for (let i = 1; i < BOARD_WIDTH; i++) {
			grid.moveTo(i * BLOCK_SIZE, 0);
			grid.lineTo(i * BLOCK_SIZE, this.height);
		}

		for (let i = 1; i < BOARD_HEIGHT; i++) {
			grid.moveTo(0, i * BLOCK_SIZE);
			grid.lineTo(this.width, i * BLOCK_SIZE);
		}

		this.addChild(grid);
	}

	private getTextureFromColorEnum(color: ColorEnum) {
		return this.textures[COLORS.indexOf(color)];
	}

	updateFromBoard(board: ColorEnum[][]) {
		for (let i = 0; i < BOARD_HEIGHT; ++i) {
			for (let j = 0; j < BOARD_WIDTH; ++j) {
				this.board[i][j].texture = this.getTextureFromColorEnum(board[i][j]);
			}
		}
	}

	updateTetrimino(tetrimino: Tetrimino, color: ColorEnum, isShadow: boolean = false) {
		if (!isShadow) {
			if (this.tetrimino) this.removeChild(this.tetrimino);
			this.tetrimino = new TetriminoContainer(color, BLOCK_SIZE, tetrimino.rotation);
			this.tetrimino.zIndex = 3;

			this.tetrimino.position.set(tetrimino.position_x * BLOCK_SIZE, tetrimino.position_y * BLOCK_SIZE);
			this.addChild(this.tetrimino);
		} else {
			if (this.shadowTetrimino) this.removeChild(this.shadowTetrimino);
			this.shadowTetrimino = new TetriminoContainer(color, BLOCK_SIZE, tetrimino.rotation, ColorEnum.SHADOW);
			this.shadowTetrimino.position.set(tetrimino.position_x * BLOCK_SIZE, tetrimino.position_y * BLOCK_SIZE);
			this.addChild(this.shadowTetrimino);
		}
	}

	animateLineBreak(row: number) {
		this.board[row].forEach((sprite) => {
			const spriteCopy = copySprite(sprite, BLOCK_SIZE);
			this.addChild(spriteCopy);

			fallingSpriteTween(spriteCopy)
				.onComplete(() => {
					this.removeChild(spriteCopy);
				})
				.start();
		});
	}

	// TODO: animation for new line

	// animateNewLine(line: ColorEnum[], posed: boolean, pos_y: number) {
	// 	this.animations.forEach((tween) => tween.end());

	// 	if(posed && this.tetrimino){
	// 		let t = new TetriminoContainer(this.tetrimino.piece, BLOCK_SIZE, this.tetrimino.rot)
	// 		t.position.set(this.tetrimino.position.x, pos_y* BLOCK_SIZE+ BLOCK_SIZE)
	// 		if(t){
	// 			console.log('f')
	// 			this.addChild(t);
	// 			this.animations.push(ascendingSprite(t)
	// 				.onComplete(() => {
	// 					this.removeChild(t);
	// 				})
	// 				.start())
	// 		}
	// 	}
	// 	line.forEach((block, i) => {
	// 		let spr = createBlockSprite(BOARD_HEIGHT, i, this.getTextureFromColorEnum(block), BLOCK_SIZE);
	// 		spr.alpha = 0;
	// 		this.addChild(spr);

	// 		this.animations.push(
	// 			ascendingSprite(spr, 0)
	// 				.onComplete(() => {
	// 					this.removeChild(spr);
	// 				})
	// 				.start(),
	// 		);
	// 	});

	// 	for(let i = 0; i < this.board.length; i++) {
	// 		for(let j = 0; j < this.board[i].length; j++) {
	// 			const sprite = this.board[i][j];
	// 			const spriteCopy = this.copySprite(sprite);
	// 			sprite.alpha = 0;

	// 			this.addChild(spriteCopy);

	// 			this.animations.push(
	// 				ascendingSprite(spriteCopy)
	// 					.onComplete(() => {
	// 						this.removeChild(spriteCopy);

	// 						sprite.alpha = 1;
	// 					})
	// 					.start(),
	// 			);
	// 		}
	// 	}
	// }
}
