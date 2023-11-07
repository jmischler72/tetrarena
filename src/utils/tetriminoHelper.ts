import type {Tetrimino} from '../types/Tetrimino';
import {BOARD_WIDTH} from "../constants/board";
import {getRandomTetriminoPiece} from "../constants/tetriminos";
import {canMoveDown} from "./constraints";
import {ColorEnum} from "../enums/color.enum";

export function getShapeFromTetrimino(tetrimino: Tetrimino): number[][] {
    let piece = tetrimino.tetriminoPiece;
    return piece.shapes[tetrimino.rotation];
}

export function clockworkRotateTetrimino(tetrimino: Tetrimino) {
    tetrimino.rotation =
        (tetrimino.rotation + 1) %
        tetrimino.tetriminoPiece.shapes.length;
}

export function getRandomTetrimino(): Tetrimino {
    return {
        position_x: BOARD_WIDTH / 2 - 1,
        position_y: 0,
        rotation : 0,
        tetriminoPiece: getRandomTetriminoPiece(),
    };
}

export function getShadowTetriminos(currentTetrimino: Tetrimino, board: ColorEnum[][]) {
    let copiedTetrimino = Object.assign({}, currentTetrimino);
    copiedTetrimino.tetriminoPiece = Object.assign(
        {},
        currentTetrimino.tetriminoPiece
    );
    while (canMoveDown(copiedTetrimino, board)) {
        copiedTetrimino.position_y++;
    }

    copiedTetrimino.tetriminoPiece.color = ColorEnum.SHADOW;
    return copiedTetrimino;
}
