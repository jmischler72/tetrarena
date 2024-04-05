import { canMoveDown, canMoveLeft, canMoveRight, canRotate } from '../utils/constraints';
import { clockworkRotateTetrimino } from '../utils/tetriminoHelper';
import { Tetrimino } from '../types/Tetrimino';
import { ColorEnum } from '../enums/color.enum';

export class Actions {
  static rotate(currentTetrimino: Tetrimino, board: ColorEnum[][]): boolean {
    if (canRotate(currentTetrimino, board)) {
      clockworkRotateTetrimino(currentTetrimino);
      return true;
    }
    return false;
  }

  static moveRight(currentTetrimino: Tetrimino, board: ColorEnum[][]): boolean {
    if (canMoveRight(currentTetrimino, board)) {
      currentTetrimino.position_x++;
      return true;
    }
    return false;
  }

  static moveDown(currentTetrimino: Tetrimino, board: ColorEnum[][]): boolean {
    if (canMoveDown(currentTetrimino, board)) {
      currentTetrimino.position_y++;
      return true;
    }
    return false;
  }

  static moveLeft(currentTetrimino: Tetrimino, board: ColorEnum[][]): boolean {
    if (canMoveLeft(currentTetrimino, board)) {
      currentTetrimino.position_x--;
      return true;
    }
    return false;
  }

  static instantPlaceTetrimino(currentTetrimino: Tetrimino, board: ColorEnum[][]): boolean {
    let hasActionBeenDone = false;

    while (canMoveDown(currentTetrimino, board)) {
      currentTetrimino.position_y++;
      hasActionBeenDone = true;
    }

    return hasActionBeenDone;
  }
}
