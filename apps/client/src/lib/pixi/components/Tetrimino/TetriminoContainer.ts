import * as PIXI from 'pixi.js';
import { Texture } from 'pixi.js';
import { getBlocksTexturesFromCache } from '../../TextureLoader';
import { getTetriminoPieceFromColor, type ColorEnum } from '@jmischler72/core';
import { createBlockSprite } from '$lib/pixi/helpers/BlockHelpers';
import { COLORS } from '$lib/pixi/consts';

export default class TetriminoContainer extends PIXI.Container {
	private readonly textures: Texture[] = [];
	private readonly size: number;

	constructor(tetriminoPiece: ColorEnum, size: number) {
		super();
		this.size = size;
		this.textures = getBlocksTexturesFromCache();

		this.renderTetriminoPiece(tetriminoPiece);
	}

	private renderTetriminoPiece(color: ColorEnum, rotation = 0) {
		const tetriminoShape: number[][] | undefined = getTetriminoPieceFromColor(color)?.shapes[rotation];
		if (!tetriminoShape) return;

		for (let i = 0; i < tetriminoShape.length; i++) {
			for (let j = 0; j < tetriminoShape[0].length; j++) {
				if (tetriminoShape[i][j]) {
					const spr = createBlockSprite(i, j, this.textures[COLORS.indexOf(color)], this.size);

					this.addChild(spr);
				}
			}
		}
	}
}
