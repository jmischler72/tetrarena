import * as PIXI from 'pixi.js';
import type { ColorEnum, Tetrimino } from '@jmischler72/core';
import { getShapeFromTetrimino } from '@jmischler72/core';
import { COLORS } from '../../consts';
import { getBlocksTexturesFromCache } from '../../TextureLoader';
import { fallingSpriteTween } from './BoardAnimation';

const BOARD_WIDTH: number = 10;
const BOARD_HEIGHT: number = 20;
const BLOCK_SIZE: number = 35;

/**
 * Render board using PIXI.js
 */
export default class Board extends PIXI.Container {
  private readonly textures: PIXI.Texture[];
  private sprites: PIXI.Sprite[][] = [];

  constructor() {
    super();
    this.sortableChildren = true;

    this.textures = getBlocksTexturesFromCache();

    this.renderBoardSprites();

    this.renderBackground();
    this.renderGrid();
  }

  private renderBackground() {
    let board_bg = new PIXI.Graphics();
    board_bg.beginFill(0x3b3b3b);
    board_bg.drawRect(0, 0, this.width, this.height);
    board_bg.zIndex = -2;
    board_bg.position.set(0, 0);

    this.addChild(board_bg);
  }

  private renderBoardSprites() {
    for (let i = 0; i < BOARD_HEIGHT; ++i) {
      let row: PIXI.Sprite[] = [];
      for (let j = 0; j < BOARD_WIDTH; ++j) {
        let spr = new PIXI.Sprite(
          this.textures[0] // Empty block
        );
        // spr.tint = 0xff0000;
        spr.width = spr.height = BLOCK_SIZE;
        spr.anchor.set(0.5, 0.5);
        spr.x = j * BLOCK_SIZE + BLOCK_SIZE / 2;
        spr.y = i * BLOCK_SIZE + BLOCK_SIZE / 2;
        row.push(spr);
        this.addChild(spr);
      }
      this.sprites.push(row);
    }
  }

  private renderGrid() {
    let grid = new PIXI.Graphics();
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

  updateColor(row: number, col: number, color: ColorEnum) {
    let sprite = this.sprites[row][col];
    if (sprite.texture != this.textures[COLORS.indexOf(color)]) {
      sprite.texture = this.textures[COLORS.indexOf(color)];
    }
  }

  updateFromBoard(board: ColorEnum[][]) {
    for (let i = 0; i < BOARD_HEIGHT; ++i) {
      for (let j = 0; j < BOARD_WIDTH; ++j) {
        this.updateColor(i, j, board[i][j]);
      }
    }
  }

  updateTetrimino(tetrimino: Tetrimino, color: ColorEnum) {
    let tetriminoShape: number[][] = getShapeFromTetrimino(tetrimino);

    for (let i = 0; i < tetriminoShape.length; ++i) {
      for (let j = 0; j < tetriminoShape[0].length; ++j) {
        if (tetriminoShape[i][j] === 1) {
          this.updateColor(tetrimino.position_y + i, tetrimino.position_x + j, color);
        }
      }
    }
  }

  animateLineBreak(row: number) {
    this.sprites[row].forEach((sprite) => {
      let spriteCopy = new PIXI.Sprite(sprite.texture);
      spriteCopy.width = spriteCopy.height = BLOCK_SIZE;
      spriteCopy.anchor.set(0.5, 0.5);
      spriteCopy.position = sprite.position;
      this.addChild(spriteCopy);

      fallingSpriteTween(spriteCopy)
        .onComplete(() => {
          this.removeChild(spriteCopy);
        })
        .start();
    });
  }
}
