import * as PIXI from 'pixi.js';

export function createBlockSprite(row: number, col: number, texture: PIXI.Texture, size: number) {
	const spr = new PIXI.Sprite(texture);
	spr.width = spr.height = size;
	spr.anchor.set(0.5, 0.5);
	spr.x = col * size + size / 2;
	spr.y = row * size + size / 2;

	return spr;
}

export function copySprite(sprite: PIXI.Sprite, size: number) {
	const spriteCopy = new PIXI.Sprite(sprite.texture);
	spriteCopy.width = spriteCopy.height = size;
	spriteCopy.anchor.set(0.5, 0.5);
	spriteCopy.position = sprite.position;
	return spriteCopy;
}
