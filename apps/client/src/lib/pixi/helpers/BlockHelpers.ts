import * as PIXI from 'pixi.js';

export function createBlockSprite(row: number, col: number, texture: PIXI.Texture, size: number) {
	const spr = new PIXI.Sprite(texture);
	spr.width = spr.height = size;
	spr.anchor.set(0.5, 0.5);
	spr.x = col * size + size / 2;
	spr.y = row * size + size / 2;

	return spr;
}
