import { Block } from './PlayerState';
import { ColorEnum, GameStateDTO, Tetrimino as TetriminoDTO } from '@jmischler72/core';
import { Player, Tetrimino } from './PlayerState';

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

function blocksToMatrix(blocks: Block[]): ColorEnum[][] {
  const maxX = Math.max(...blocks.map((block) => block.x)) + 1;
  const maxY = Math.max(...blocks.map((block) => block.y)) + 1;

  const matrix: ColorEnum[][] = Array.from({ length: maxY }, () => Array(maxX).fill(ColorEnum.NONE));

  blocks.forEach((block) => {
    matrix[block.y][block.x] = block.value;
  });

  return matrix;
}

function toTetriminoDTO(tetrimino: Tetrimino): TetriminoDTO {
  return {
    position_x: tetrimino.x,
    position_y: tetrimino.y,
    rotation: tetrimino.rotation,
    color: tetrimino.color,
  };
}

export function toGameStateDTO(player: Player): GameStateDTO {
  return {
    board: blocksToMatrix(player.board),
    currentTetrimino: toTetriminoDTO(player.currentTetrimino),
    shadowTetrimino: toTetriminoDTO(player.shadowTetrimino),
    score: player.score,
    nextTetriminos: player.nextTetriminos,
    isGameOver: player.isGameOver,
    deletedLines: player.deletedLines,
    numberAddedLines: player.numberAddedLines,
    currentTetriminoFreezed: player.currentTetriminoFreezed,
  };
}
