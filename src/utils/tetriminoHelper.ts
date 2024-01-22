import type {Tetrimino} from '../types/Tetrimino';
import {BOARD_WIDTH} from "../constants/board";
import {ColorEnum} from "../enums/color.enum";
import {canMoveDown} from "./constraints";
import {getTetriminoPieceFromColor} from "../constants/tetriminos";

export function getShapeFromTetrimino(tetrimino: Tetrimino): number[][] {
    let piece = getTetriminoPieceFromColor(tetrimino.color);
    if (!piece) return [];
    return piece.shapes[tetrimino.rotation];
}

export function clockworkRotateTetrimino(tetrimino: Tetrimino) {
    let piece = getTetriminoPieceFromColor(tetrimino.color);
    if (!piece) return;
    tetrimino.rotation =
        (tetrimino.rotation + 1) %
        piece.shapes.length;
}

export function checkIfLineIsFull(row: ColorEnum[]) {
    const nonPlayableColors = [ColorEnum.NONE, ColorEnum.SHADOW];
    return row.filter(block => nonPlayableColors.includes(block)).length === 0;
}

export function getNewTetrimino(shape: ColorEnum): Tetrimino {
    return {
        position_x: BOARD_WIDTH / 2 - 1,
        position_y: 0,
        rotation: 0,
        color: shape,
    };
}

export function getShadowTetriminos(currentTetrimino: Tetrimino, board: ColorEnum[][]) {
    let copiedTetrimino = Object.assign({}, currentTetrimino);

    while (canMoveDown(copiedTetrimino, board)) {
        copiedTetrimino.position_y++;
    }

    return copiedTetrimino;
}

