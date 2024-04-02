import {Block} from "./PlayerState";

export function matrixToBlocks(matrix: number[][]) {
    const blocks: Block[] = [];

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            let block = new Block();
            block.value = matrix[y][x];
            block.x = x;
            block.y = y;
            blocks.push(block);
        }
    }
    return blocks;
}