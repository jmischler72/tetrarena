import { BOARD_HEIGHT, BOARD_WIDTH } from '../src/constants/game';
import { ColorEnum } from '../src';
import { canMoveDown, canMoveLeft, canMoveRight } from '../src/utils/constraints.helpers';
import { clockworkRotateTetrimino } from '../src/utils/tetrimino.helpers';
import { Tetrimino } from '../src/types/Tetrimino';
import { uid } from 'uid';

describe('test constraints', () => {
  let board: ColorEnum[][];
  let t_shape: Tetrimino;

  beforeEach(() => {
    board = new Array(BOARD_HEIGHT).fill(ColorEnum.NONE).map(() => new Array(BOARD_WIDTH).fill(ColorEnum.NONE));

    t_shape = {
      id: uid(),
      position_x: 0,
      position_y: 0,
      rotation: 0,
      color: ColorEnum.PURPLE,
    };
  });

  test('piece with 0 values on left should be able to go left', () => {
    clockworkRotateTetrimino(t_shape);
    expect(canMoveLeft(t_shape, board)).toBe(true);
  });

  test('canMoveLeft should be false', () => {
    t_shape.position_x--;
    expect(canMoveLeft(t_shape, board)).toBe(false);
  });

  test('canMoveRight should be true', () => {
    expect(canMoveRight(t_shape, board)).toBe(true);
  });

  test('canMoveRight should be false', () => {
    while (canMoveRight(t_shape, board)) {
      t_shape.position_x++;
    }
    expect(canMoveRight(t_shape, board)).toBe(false);
  });

  test('canMoveDown should be true', () => {
    expect(canMoveRight(t_shape, board)).toBe(true);
  });

  test('piece at the bottom of board should not be able to go down', () => {
    while (canMoveDown(t_shape, board)) {
      t_shape.position_y--;
    }
    expect(canMoveDown(t_shape, board)).toBe(false);
  });
});
