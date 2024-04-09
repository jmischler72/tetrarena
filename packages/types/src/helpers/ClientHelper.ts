import { ColorEnum, GameStateDTO, Tetrimino as TetriminoDTO } from '@jmischler72/core';
import { Block, GameState, Tetrimino } from '../schemas/PlayerState';

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

export function toGameStateDTO(player: GameState): GameStateDTO {
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
