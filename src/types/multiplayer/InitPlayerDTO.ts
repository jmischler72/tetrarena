import {TetriminoPiece} from "../../constants/tetriminos";

export type InitPlayerDTO = {
    id: string;
    opponentId: string
    currentTetrimino: TetriminoPiece;
    nextTetriminos: TetriminoPiece[];
};