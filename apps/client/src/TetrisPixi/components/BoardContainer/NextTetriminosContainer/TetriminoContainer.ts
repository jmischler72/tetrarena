import * as PIXI from 'pixi.js';
import { Sprite, Texture } from 'pixi.js';
import { SMALL_BLOCK_SIZE } from './constants';
import { COLORS } from '../../../consts';
import { getBlocksTexturesFromCache } from '../../../TextureLoader';
import { getTetriminoPieceFromColor, type ColorEnum } from '@jmischler72/core';

export default class TetriminoContainer extends PIXI.Container {
  private readonly textures: Texture[] = [];

  constructor(tetriminoPiece: ColorEnum) {
    super();
    this.textures = getBlocksTexturesFromCache();

    this.renderTetriminoPiece(tetriminoPiece);
  }

  private renderTetriminoPiece(color: ColorEnum) {
    const tetriminoShape: number[][] | undefined = getTetriminoPieceFromColor(color)?.shapes[0];
    if (!tetriminoShape) return;

    for (let i = 0; i < tetriminoShape.length; i++) {
      for (let j = 0; j < tetriminoShape[0].length; j++) {
        if (tetriminoShape[i][j]) {
          const spr = new Sprite(this.textures[COLORS.indexOf(color)]);
          // spr.tint = 0xff0000;
          spr.width = spr.height = SMALL_BLOCK_SIZE;
          spr.anchor.set(0.5, 0.5);
          spr.x = j * SMALL_BLOCK_SIZE + SMALL_BLOCK_SIZE / 2;
          spr.y = i * SMALL_BLOCK_SIZE + SMALL_BLOCK_SIZE / 2;
          this.addChild(spr);
        }
      }
    }
  }
}
