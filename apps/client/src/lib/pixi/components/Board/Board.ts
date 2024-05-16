import * as PIXI from 'pixi.js';
import { ColorEnum, type GameStateDTO, type Tetrimino } from '@jmischler72/core';
import { getShapeFromTetrimino } from '@jmischler72/core';
import { COLORS } from '../../consts';
import { getBlocksTexturesFromCache } from '../../TextureLoader';
import { ascendingSprite, fallingSpriteTween } from './BoardAnimation';
import { Tween } from '@tweenjs/tween.js';
import { createBlockSprite } from '$lib/pixi/helpers/BlockHelpers';
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
	private tetrimino: PIXI.Sprite[] = [];
	private shadowTetrimino: PIXI.Sprite[] = [];

	private animations: Tween<any>[] = [];

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
			this.removeChild(...this.tetrimino);
			this.tetrimino = this.getTetriminoSprites(tetrimino, color);
			this.addChild(...this.tetrimino);
		} else {
			this.removeChild(...this.shadowTetrimino);
			this.shadowTetrimino = this.getTetriminoSprites(tetrimino, color);
			this.addChild(...this.shadowTetrimino);
		}
	}

	private getTetriminoSprites(tetrimino: Tetrimino, color: ColorEnum) {
		const tetriminoShape: number[][] = getShapeFromTetrimino(tetrimino);
		const tetriminoSprites: PIXI.Sprite[] = [];

		for (let i = 0; i < tetriminoShape.length; ++i) {
			for (let j = 0; j < tetriminoShape[0].length; ++j) {
				if (tetriminoShape[i][j] === 1) {
					const spr = createBlockSprite(
						tetrimino.position_y + i,
						tetrimino.position_x + j,
						this.getTextureFromColorEnum(color),
						BLOCK_SIZE,
					);
					tetriminoSprites.push(spr);
				}
			}
		}
		return tetriminoSprites;
	}

	private copySprite(sprite: PIXI.Sprite) {
		const spriteCopy = new PIXI.Sprite(sprite.texture);
		spriteCopy.width = spriteCopy.height = BLOCK_SIZE;
		spriteCopy.anchor.set(0.5, 0.5);
		spriteCopy.position = sprite.position;
		return spriteCopy;
	}

	animateLineBreak(row: number) {
		this.board[row].forEach((sprite) => {
			const spriteCopy = this.copySprite(sprite);
			this.addChild(spriteCopy);

			fallingSpriteTween(spriteCopy)
				.onComplete(() => {
					this.removeChild(spriteCopy);
				})
				.start();
		});
	}

	animateNewLine(line: ColorEnum[]) {
		this.animations.forEach((tween) => tween.end());

		line.forEach((block, i) => {
			let spr = createBlockSprite(BOARD_HEIGHT, i, this.getTextureFromColorEnum(block), BLOCK_SIZE);
			spr.alpha = 0;
			this.addChild(spr);

			this.animations.push(
				ascendingSprite(spr, 0)
					.onComplete(() => {
						this.removeChild(spr);
					})
					.start(),
			);
		});

		this.board.flat().forEach((sprite) => {
			const spriteCopy = this.copySprite(sprite);
			sprite.alpha = 0;

			this.addChild(spriteCopy);

			this.animations.push(
				ascendingSprite(spriteCopy)
					.onComplete(() => {
						this.removeChild(spriteCopy);
						sprite.alpha = 1;
					})
					.start(),
			);
		});
	}
}
