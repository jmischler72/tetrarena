import * as PIXI from 'pixi.js';
import { Texture } from 'pixi.js';
import { getBlocksTexturesFromCache } from '../../TextureLoader';
import { getTetriminoPieceFromColor, type ColorEnum } from '@jmischler72/core';
import { createBlockSprite } from '$lib/pixi/helpers/BlockHelpers';
import { COLORS } from '$lib/pixi/consts';

export default class TetriminoContainer extends PIXI.Container {
	private readonly textures: Texture[] = [];
	private readonly size: number;
	public piece: ColorEnum;
	public rot: number;

	constructor(piece: ColorEnum, size: number, rotation: number = 0, color: ColorEnum = piece) {
		super();
		this.size = size;
		this.piece = piece;
		this.rot = rotation;

		this.textures = getBlocksTexturesFromCache();

		const tetriminoShape: number[][] | undefined = getTetriminoPieceFromColor(piece)?.shapes[rotation];

		if (tetriminoShape) this.renderTetriminoPiece(tetriminoShape, color);
	}

	private renderTetriminoPiece(shape: number[][], color: ColorEnum) {
		if (!shape) return;

		for (let i = 0; i < shape.length; i++) {
			for (let j = 0; j < shape[0].length; j++) {
				if (shape[i][j]) {
					const spr = createBlockSprite(i, j, this.textures[COLORS.indexOf(color)], this.size);

					this.addChild(spr);
				}
			}
		}
	}
}
