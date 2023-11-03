import type {TetriminoPiece} from "../constants/tetriminos";

export interface Tetrimino {
  position_x: number;
  position_y: number;
  tetriminoPiece: TetriminoPiece;
}
