import type {Tetrimino} from '../types/Tetrimino';

import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants/board';
import {ColorEnum} from '../enums/color.enum';
import {canPlaceTetrimino,} from '../utils/constraints';

import {ActionsEnum} from '../enums/actions.enum';
import {
    checkIfLineIsFull,
    getRandomTetrimino,
    getShadowTetriminos,
    getShapeFromTetrimino
} from '../utils/tetriminoHelper';
import {Actions} from "./Actions";

export class GameState {
    protected board: ColorEnum[][] = new Array(BOARD_HEIGHT)
        .fill(ColorEnum.NONE)
        .map(() => new Array(BOARD_WIDTH).fill(ColorEnum.NONE));

    protected currentTetrimino: Tetrimino = getRandomTetrimino();
    protected shadowTetrimino: Tetrimino = getShadowTetriminos(this.currentTetrimino, this.board);

    protected nextTetriminos: Tetrimino[] = new Array(5)
        .fill({})
        .map(() => getRandomTetrimino());

    protected score: number = 0;
    public isGameOver: boolean = false;
    protected deletedLines: number[] = [];
    protected numberAddedLines: number = 0;
    protected currentTetriminoFreezed: boolean = false;

    private undrawShape(tetrimino: Tetrimino) {
        for (let j = 0; j < getShapeFromTetrimino(tetrimino).length; j++) {
            for (let k = 0; k < getShapeFromTetrimino(tetrimino)[j].length; k++) {
                if (getShapeFromTetrimino(tetrimino)[j][k] === 1)
                    this.board[tetrimino.position_y + j][tetrimino.position_x + k] =
                        ColorEnum.NONE;
            }
        }
    }

    private drawShape(tetrimino: Tetrimino) {
        for (let j = 0; j < getShapeFromTetrimino(tetrimino).length; j++) {
            for (let k = 0; k < getShapeFromTetrimino(tetrimino)[j].length; k++) {
                if (getShapeFromTetrimino(tetrimino)[j][k] === 1)
                    this.board[tetrimino.position_y + j][tetrimino.position_x + k] =
                        tetrimino.tetriminoPiece.color;
            }
        }
    }

    private checkBreakLine() {
        this.board.forEach((row, index) => {
            if (checkIfLineIsFull(row)) {
                this.deletedLines.push(index);
                this.board.splice(index, 1);
                this.board.unshift(new Array(BOARD_WIDTH).fill(ColorEnum.NONE));
                this.score++;
            }
        });
    }

    private checkForGameOver() {
        if (canPlaceTetrimino(this.nextTetriminos[0], this.board)) {
            this.switchCurrentTetrimino();
        } else {
            this.isGameOver = true;
        }
    }

    private switchCurrentTetrimino() {
        this.currentTetriminoFreezed = true;
        this.currentTetrimino = this.nextTetriminos.shift()!; // ! is a non-null assertion operator since shift() can return undefined if the array is empty
        this.nextTetriminos.push(getRandomTetrimino());
    }

    handleAction(action: ActionsEnum): boolean {
        this.undrawShape(this.currentTetrimino);
        this.undrawShape(this.shadowTetrimino);

        let hasActionBeenDone: boolean = false;

        switch (action) {
            case ActionsEnum.GO_LEFT:
                hasActionBeenDone = Actions.moveLeft(this.currentTetrimino, this.board);
                break;

            case ActionsEnum.GO_RIGHT:
                hasActionBeenDone = Actions.moveRight(this.currentTetrimino, this.board);
                break;

            case ActionsEnum.ROTATE:
                hasActionBeenDone = Actions.rotate(this.currentTetrimino, this.board);
                break;

            case ActionsEnum.GO_DOWN:
                hasActionBeenDone = Actions.moveDown(this.currentTetrimino, this.board);

                break;

            case ActionsEnum.INSTANT_PLACE:
                hasActionBeenDone = Actions.instantPlaceTetrimino(this.currentTetrimino, this.board);
                break;
        }

        this.shadowTetrimino = getShadowTetriminos(this.currentTetrimino, this.board);
        this.drawShape(this.shadowTetrimino);
        this.drawShape(this.currentTetrimino); // draw shadow before tetronimo so it is in front of the shadow

        if ([ActionsEnum.INSTANT_PLACE, ActionsEnum.GO_DOWN].includes(action) && !hasActionBeenDone) {
            this.checkBreakLine();
            this.checkForGameOver();
        }

        return hasActionBeenDone;
    }
}