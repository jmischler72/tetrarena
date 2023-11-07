import type {Tetrimino} from '../types/Tetrimino';

export function getShapeFromTetrimino(tetrimino: Tetrimino): number[][] {
    let piece = tetrimino.tetriminoPiece;
    return piece.shapes[tetrimino.rotation];
}

export function clockworkRotateTetrimino(tetrimino: Tetrimino) {
    tetrimino.rotation =
        (tetrimino.rotation + 1) %
        tetrimino.tetriminoPiece.shapes.length;
}

