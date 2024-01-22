import type {ColorEnum} from "../enums/color.enum";
import {Tetrimino} from "types/Tetrimino";

export type GameStateDTO = {
    board: ColorEnum[][];
    currentTetrimino: Tetrimino;
    shadowTetrimino: Tetrimino;
    score: number;
    nextTetriminos: ColorEnum[];
    isGameOver: boolean;
    deletedLines: number[];
    numberAddedLines: number;
    currentTetriminoFreezed: boolean;
};