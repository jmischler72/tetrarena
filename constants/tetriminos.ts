import { ColorEnum } from '../enums/color.enum';
import {
  I_SHAPE,
  LL_SHAPE,
  LR_SHAPE,
  O_SHAPE,
  S_SHAPE,
  T_SHAPE,
  Z_SHAPE,
} from './shapes';

export type TetriminoPiece = {
  shape: number[][][];
  color: ColorEnum;
  rotation: number;
};

export const tetriminoPieces: TetriminoPiece[] = [
  {
    shape: T_SHAPE,
    color: ColorEnum.PURPLE,
    rotation: 0,
  },
  {
    shape: LL_SHAPE,
    color: ColorEnum.BLUE,
    rotation: 0,
  },
  {
    shape: LR_SHAPE,
    color: ColorEnum.ORANGE,
    rotation: 0,
  },
  {
    shape: I_SHAPE,
    color: ColorEnum.LIGHT_BLUE,
    rotation: 0,
  },
  {
    shape: O_SHAPE,
    color: ColorEnum.YELLOW,
    rotation: 0,
  },
  {
    shape: Z_SHAPE,
    color: ColorEnum.RED,
    rotation: 0,
  },
  {
    shape: S_SHAPE,
    color: ColorEnum.GREEN,
    rotation: 0,
  },
];

export function getRandomTetrimino(): TetriminoPiece {
  return tetriminoPieces[Math.floor(Math.random() * tetriminoPieces.length)];
}
