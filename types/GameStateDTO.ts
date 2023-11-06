import type {ColorEnum} from "../enums/color.enum";

export type TetriminoPieceDTO = {
    shape: number[][];
    color: ColorEnum;
}

export type GameStateDTO = {
    board: ColorEnum[][];
    score: number;
    nextTetriminos: TetriminoPieceDTO[];
    isGameOver: boolean;
    deletedLines: number[];
    currentTetriminoFreezed: boolean;
};