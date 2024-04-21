import type { Tetrimino } from '../types/Tetrimino';
import { BOARD_WIDTH } from '../constants/game';
import { ColorEnum } from '../enums/color.enum';
import { canMoveDown } from './constraints.helpers';
import { getTetriminoPieceFromColor } from '../constants/tetriminos';
import { uid } from 'uid';

export function getShapeFromTetrimino(tetrimino: Tetrimino): number[][] {
  const piece = getTetriminoPieceFromColor(tetrimino.color);
  if (!piece) return [];
  return piece.shapes[tetrimino.rotation];
}

export function clockworkRotateTetrimino(tetrimino: Tetrimino) {
  const piece = getTetriminoPieceFromColor(tetrimino.color);
  if (!piece) return;
  if (tetrimino.position_x === -1) tetrimino.position_x++;
  if (tetrimino.position_x === BOARD_WIDTH - 2) tetrimino.position_x--;
  tetrimino.rotation = (tetrimino.rotation + 1) % piece.shapes.length;
}

export function checkIfLineIsFull(row: ColorEnum[]) {
  const nonPlayableColors = [ColorEnum.NONE, ColorEnum.SHADOW];
  return row.filter((block) => nonPlayableColors.includes(block)).length === 0;
}

export function getNewTetrimino(shape: ColorEnum): Tetrimino {
  return {
    id: uid(),
    position_x: BOARD_WIDTH / 2 - 1,
    position_y: 0,
    rotation: 0,
    color: shape,
  };
}

export function getShadowTetriminos(currentTetrimino: Tetrimino, board: ColorEnum[][]) {
  const copiedTetrimino = Object.assign({}, currentTetrimino);

  while (canMoveDown(copiedTetrimino, board)) {
    copiedTetrimino.position_y++;
  }

  return copiedTetrimino;
}
