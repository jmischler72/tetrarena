import * as TWEEN from "@tweenjs/tween.js";
import type * as PIXI from 'pixi.js';


export function fallingSpriteTween(sprite: PIXI.Sprite) {
    let spriteValues = {
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
            800
        )
        .easing(TWEEN.Easing.Exponential.Out)
        .onUpdate(() => {
            sprite.rotation = spriteValues.rotation;
            sprite.position.y += spriteValues.pos_y;
            sprite.alpha = spriteValues.alpha;
        });
}