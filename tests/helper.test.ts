import {tetriminoPieces} from "../constants/tetriminos";
import {BOARD_HEIGHT, BOARD_WIDTH} from "../constants/board";
import {ColorEnum} from "../enums/color.enum";
import {canMoveLeft} from "../utils/constraints";
import {clockworkRotateTetrimino, getShapeFromTetrimino} from "../utils/tetriminoHelper";


const board: ColorEnum[][] = new Array(BOARD_HEIGHT)
    .fill(ColorEnum.NONE)
    .map(() => new Array(BOARD_WIDTH).fill(ColorEnum.NONE));


const t_shape = {
    position_x: 0,
    position_y: 0,
    tetriminoPiece: tetriminoPieces[0],
}

console.log(getShapeFromTetrimino(t_shape));

clockworkRotateTetrimino(t_shape);

console.log(getShapeFromTetrimino(t_shape));


test('t_shape can go left', () => {
    expect(canMoveLeft(t_shape, board)).toBe(true);
});

t_shape.position_x--;

test('t_shape cannot go left', () => {
    expect(canMoveLeft(t_shape, board)).toBe(true);
});