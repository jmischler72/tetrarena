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

//
// export function blocksToMatrix(blocks: Block[]): ColorEnum[][] {
//     // Trouver les dimensions de la matrice
//     const maxX = Math.max(...blocks.map(block => block.x)) + 1;
//     const maxY = Math.max(...blocks.map(block => block.y)) + 1;
//
//     // Initialiser la matrice avec des valeurs par défaut
//     const matrix: ColorEnum[][] = Array.from({length: maxY}, () =>
//         Array(maxX).fill(ColorEnum.Red)
//     );
//
//     // Remplir la matrice avec les couleurs des blocks
//     blocks.forEach(block => {
//         matrix[block.y][block.x] = block.value;
//     });
//
//     return matrix;
// }