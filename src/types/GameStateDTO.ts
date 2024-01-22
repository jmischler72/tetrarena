import type {ColorEnum} from "../enums/color.enum";

export type TetriminoDTO = {
    position_x: number;
    position_y: number;
    rotation: number,
    shape: ColorEnum,
}

export type GameStateDTO = {
    board: ColorEnum[][];
    currentTetrimino: TetriminoDTO;
    shadowTetrimino: TetriminoDTO;
    score: number;
    nextTetriminos: ColorEnum[];
    isGameOver: boolean;
    deletedLines: number[];
    numberAddedLines: number;
    currentTetriminoFreezed: boolean;
};