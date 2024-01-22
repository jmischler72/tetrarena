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
  shapes: number[][][];
  color: ColorEnum;
};

export const tetriminoPieces: TetriminoPiece[] = [
  {
    shapes: T_SHAPE,
    color: ColorEnum.PURPLE,
  },
  {
    shapes: LL_SHAPE,
    color: ColorEnum.BLUE,
  },
  {
    shapes: LR_SHAPE,
    color: ColorEnum.ORANGE,
  },
  {
    shapes: I_SHAPE,
    color: ColorEnum.LIGHT_BLUE,
  },
  {
    shapes: O_SHAPE,
    color: ColorEnum.YELLOW,
  },
  {
    shapes: Z_SHAPE,
    color: ColorEnum.RED,
  },
  {
    shapes: S_SHAPE,
    color: ColorEnum.GREEN,
  },
];

export function getRandomTetriminoPiece(): TetriminoPiece {
  return tetriminoPieces[Math.floor(Math.random() * tetriminoPieces.length)];
}

export function getTetriminoPieceFromColor(color: ColorEnum){
  tetriminoPieces.filter((tetriminoPiece)=> tetriminoPiece.color === color);
}
