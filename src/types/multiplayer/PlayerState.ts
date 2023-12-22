import {TetriminoPiece} from "../../constants/tetriminos";
import {ColorEnum} from "../../enums/color.enum";
import {Tetrimino} from "../Tetrimino";

export type PlayerState = {
    id: string;
    opponentId: string
    currentTetrimino: Tetrimino;
    nextTetriminos: TetriminoPiece[];
    score?: number,
    board?: ColorEnum[][],
};