import type { Tetrimino } from '../types/Tetrimino';
import { ColorEnum } from '../enums/color.enum';
import { clockworkRotateTetrimino, getShapeFromTetrimino } from './tetrimino.helpers';

export const canMoveDown = (tetrimino: Tetrimino, board: ColorEnum[][]) => {
  const copiedTetriminos = Object.assign({}, tetrimino);
  copiedTetriminos.position_y++;

  return canPlaceTetrimino(copiedTetriminos, board);
};

export const canMoveLeft = (tetrimino: Tetrimino, board: ColorEnum[][]) => {
  const copiedTetriminos = Object.assign({}, tetrimino);
  copiedTetriminos.position_x--;

  return canPlaceTetrimino(copiedTetriminos, board);
};

export const canMoveRight = (tetrimino: Tetrimino, board: ColorEnum[][]) => {
  const copiedTetriminos = Object.assign({}, tetrimino);
  copiedTetriminos.position_x++;

  return canPlaceTetrimino(copiedTetriminos, board);
};

export const canRotate = (tetrimino: Tetrimino, board: ColorEnum[][]) => {
  const copiedTetrimino = Object.assign({}, tetrimino);

  clockworkRotateTetrimino(copiedTetrimino);
  return canPlaceTetrimino(copiedTetrimino, board);
};

export function canPlaceTetrimino(tetrimino: Tetrimino, board: ColorEnum[][]) {
  const tetriminoShape = getShapeFromTetrimino(tetrimino);

  for (let j = 0; j < tetriminoShape.length; j++) {
    for (let k = 0; k < tetriminoShape[j].length; k++) {
      if (tetriminoShape[j][k] !== 0) {
        if (board[tetrimino.position_y + j] === undefined || board[tetrimino.position_x + k] === undefined) {
          return false;
        }
        if (board[tetrimino.position_y + j][tetrimino.position_x + k] !== ColorEnum.NONE) return false;
      }
    }
  }
  return true;
}
