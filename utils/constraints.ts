import type {Tetrimino} from '../types/Tetrimino';
import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants/board';
import {ColorEnum} from '../enums/color.enum';
import {
    clockworkRotateTetrimino,
    getBottomPositionOfTetrimino,
    getLeftPositionOfTetrimino, getRightPositionOfTetrimino,
    getShapeFromTetrimino,
    getWidthOfTetrimino
} from './tetriminoHelper';

export const canMoveDown = (tetrimino: Tetrimino, board: ColorEnum[][]) => {
    if (
        tetrimino.position_y + getBottomPositionOfTetrimino(tetrimino) + 1 >=
        BOARD_HEIGHT
    )
        return false; //check bordure
    const copiedTetriminos = Object.assign({}, tetrimino);
    copiedTetriminos.position_y++;

    return canPlaceTetrimino(copiedTetriminos, board);
};

export const canMoveLeft = (tetrimino: Tetrimino, board: ColorEnum[][]) => {
    // if (tetrimino.position_x - 1 + getLeftPositionOfTetrimino(tetrimino) < 0) return false; //check bordure
    const copiedTetriminos = Object.assign({}, tetrimino);

    copiedTetriminos.position_x--;

    return canPlaceTetrimino(copiedTetriminos, board);
};

export const canMoveRight = (tetrimino: Tetrimino, board: ColorEnum[][]) => {
    // if (
    //     tetrimino.position_x + getRightPositionOfTetrimino(tetrimino) >=
    //     BOARD_WIDTH
    // )
    //     return false; //check bordure
    const copiedTetriminos = Object.assign({}, tetrimino);
    copiedTetriminos.position_x++;

    return canPlaceTetrimino(copiedTetriminos, board);
};

export const canRotate = (tetrimino: Tetrimino, board: ColorEnum[][]) => {
    let copiedTetrimino = Object.assign({}, tetrimino);
    copiedTetrimino.tetriminoPiece = Object.assign(
        {},
        tetrimino.tetriminoPiece
    );
    clockworkRotateTetrimino(copiedTetrimino);
    return canPlaceTetrimino(copiedTetrimino, board);
}

export function canPlaceTetrimino(tetrimino: Tetrimino, board: ColorEnum[][]) {
    let tetriminoShape = getShapeFromTetrimino(tetrimino);
    for (let j = 0; j < tetriminoShape.length; j++) {
        for (let k = 0; k < tetriminoShape[j].length; k++) {
            if (
                tetriminoShape[j][k] !== 0 &&
                board[tetrimino.position_y + j][tetrimino.position_x + k] !==
                ColorEnum.NONE
            )
                return false;
        }
    }
    return true;
}
