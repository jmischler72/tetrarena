import * as PIXI from "pixi.js";
import {Texture} from "pixi.js";
import {spritesheet} from '$lib';

export function addBlocksTexturesToCache() {
    const texture = PIXI.Texture.from(spritesheet);

    PIXI.Cache.set('blocks_0', Texture.EMPTY);
    PIXI.Cache.set('blocks_9', Texture.WHITE);

    for (let i = 1; i < 9; i++) {
        const texture_t = new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(i * 45, 0, 45, 45));
        PIXI.Cache.set('blocks_' + i, texture_t);
    }
}

export function getBlocksTexturesFromCache() {
    const texture = PIXI.Texture.from(spritesheet);

    const textures = [Texture.EMPTY]
    for (let i = 0; i < 9; i++) {
        textures.push(new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(i * 45, 0, 45, 45)));
    }
    return textures;
}