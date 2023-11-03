import type { Tetrimino } from '../types/Tetrimino';
/*
TODO:
- write better for width and height
 */
export function getShapeFromTetrimino(tetrimino: Tetrimino): number[][] {
  let piece = tetrimino.tetriminoPiece;
  return piece.shape[piece.rotation];
}

export function getHeightOfTetrimino(tetrimino: Tetrimino) {
  let shape = getShapeFromTetrimino(tetrimino);
  let height = 0;
  for (let i = 0; i < shape.length; i++) {
    let check = false;
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1) check = true;
    }
    if (check) height++;
  }
  return height;
}

export function getWidthOfTetrimino(tetrimino: Tetrimino) {
  let shape = getShapeFromTetrimino(tetrimino);
  let width = 0;
  for (let i = 0; i < shape.length; i++) {
    let tmp = 0;
    shape[i].forEach(num => num === 1 && tmp++);
    width = Math.max(tmp, width);
  }
  return width;
}

export function getLeftPositionOfTetrimino(tetrimino: Tetrimino) {
  let shape = getShapeFromTetrimino(tetrimino);
  for (let i = 0; i < shape.length; i++) {
    if(shape[i][0] === 1) return 0;
  }
  return 1;
}

export function getBottomPositionOfTetrimino(tetrimino: Tetrimino){
  let shape = getShapeFromTetrimino(tetrimino);
  for(let i = shape.length -1; i>0; i--){
    if (Math.max(...shape[i]) === 1) return i;
  }
  return 0;
}
