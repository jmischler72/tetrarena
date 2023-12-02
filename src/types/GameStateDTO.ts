import type {ColorEnum} from "../enums/color.enum";

export type TetriminoPieceDTO = {
    shape: number[][];
    color: ColorEnum;
}

export type TetriminoDTO = {
    position_x: number;
    position_y: number;
    tetriminoPiece: TetriminoPieceDTO;
}

export type GameStateDTO = {
    board: ColorEnum[][];
    currentTetrimino: TetriminoDTO;
    shadowTetrimino: TetriminoDTO;
    score: number;
    nextTetriminos: TetriminoPieceDTO[];
    isGameOver: boolean;
    deletedLines: number[];
    numberAddedLines: number;
    currentTetriminoFreezed: boolean;
};