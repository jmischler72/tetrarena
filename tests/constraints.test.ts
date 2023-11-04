import {BOARD_HEIGHT, BOARD_WIDTH} from "../constants/board";
import {ColorEnum} from "../enums/color.enum";
import {canMoveDown, canMoveLeft, canMoveRight} from "../utils/constraints";
import {clockworkRotateTetrimino} from "../utils/tetriminoHelper";
import {Tetrimino} from "../types/Tetrimino";
import {T_SHAPE} from "../constants/shapes";


describe('test constraints', () => {
    let board: ColorEnum[][];
    let t_shape: Tetrimino;


    beforeEach(() => {
        board = new Array(BOARD_HEIGHT)
            .fill(ColorEnum.NONE)
            .map(() => new Array(BOARD_WIDTH).fill(ColorEnum.NONE));

        t_shape = {
            position_x: 0,
            position_y: 0,
            tetriminoPiece: {
                shape: T_SHAPE,
                color: ColorEnum.PURPLE,
                rotation: 0,
            },
        }
    })

    test('piece with 0 values on left should be able to go left', () => {
        clockworkRotateTetrimino(t_shape);
        expect(canMoveLeft(t_shape, board)).toBe(true);
    });

    test('canMoveLeft should be false', () => {
        t_shape.position_x--;
        expect(canMoveLeft(t_shape, board)).toBe(false);
    });

    test('canMoveRight should be true', () => {
        expect(canMoveRight(t_shape, board)).toBe(true);
    });


    test('canMoveRight should be false', () => {
        while (canMoveRight(t_shape, board)){
            t_shape.position_x++;
        }
        expect(canMoveRight(t_shape, board)).toBe(false);
    });

    test('canMoveDown should be true', () => {
        expect(canMoveRight(t_shape, board)).toBe(true);
    });

    test('piece at the bottom of board should not be able to go down', () => {
        while (canMoveDown(t_shape, board)){
            t_shape.position_y--;
        }
        expect(canMoveRight(t_shape, board)).toBe(false);
    });
})


