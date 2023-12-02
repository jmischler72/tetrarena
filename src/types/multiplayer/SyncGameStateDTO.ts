import {Tetrimino} from "../Tetrimino";
import {ColorEnum} from "../../enums/color.enum";
import {TetriminoPiece} from "../../constants/tetriminos";

export type SyncGameStateDTO = {
    board: ColorEnum[][];
    currentTetrimino: Tetrimino;
    shadowTetrimino: Tetrimino;
    score: number;
    nextTetriminos: TetriminoPiece[];
    isGameOver: boolean;
    deletedLines: number[];
    numberAddedLines: number;
    currentTetriminoFreezed: boolean;
};