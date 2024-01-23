export interface Block {
    x: number,
    y: number,
    value: number
}

export interface Tetrimino {
    x: number,
    y: number,
    rotation: number,
    color: number
}

export interface Player {
    board: Block[],
    currentTetrimino: Tetrimino,
    shadowTetrimino: Tetrimino,
    score: number,
    nextTetrimino: number[],
    isGameOver: boolean,
    deletedLines: number[],
    currentTetriminoFreezed: boolean
}