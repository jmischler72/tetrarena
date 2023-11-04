import type {Tetrimino} from '../types/Tetrimino';

export function getShapeFromTetrimino(tetrimino: Tetrimino): number[][] {
    let piece = tetrimino.tetriminoPiece;
    return piece.shape[piece.rotation];
}

export function clockworkRotateTetrimino(tetrimino: Tetrimino) {
    tetrimino.tetriminoPiece.rotation =
        (tetrimino.tetriminoPiece.rotation + 1) %
        tetrimino.tetriminoPiece.shape.length;
}

