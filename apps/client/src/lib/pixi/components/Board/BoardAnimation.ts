import { BLOCK_SIZE } from '$lib/pixi/constants/board';
import * as TWEEN from '@tweenjs/tween.js';
import type * as PIXI from 'pixi.js';

export function fallingSpriteTween(sprite: PIXI.Sprite) {
	const spriteValues = {
		rotation: 0,
		pos_y: 0,
		alpha: 1,
	};
	return new TWEEN.Tween(spriteValues)
		.to(
			{
				rotation: Math.random() * 4 - 2,
				pos_y: Math.random() * 4 + 4,
				alpha: 0,
			},
			800,
		)
		.easing(TWEEN.Easing.Exponential.Out)
		.onUpdate(() => {
			sprite.rotation = spriteValues.rotation;
			sprite.position.y += spriteValues.pos_y;
			sprite.alpha = spriteValues.alpha;
		});
}

export function ascendingSprite(sprite: PIXI.Sprite, opacity: number = 1) {
	const spriteValues = {
		pos_y: sprite.position.y,
		opacity: opacity,
	};

	return new TWEEN.Tween(spriteValues)
		.to(
			{
				pos_y: sprite.position.y - BLOCK_SIZE,
				opacity: 1,
			},
			500,
		)
		.easing(TWEEN.Easing.Exponential.Out)
		.onUpdate(() => {
			sprite.alpha = spriteValues.opacity;
			sprite.position.y = spriteValues.pos_y;
		});
}
