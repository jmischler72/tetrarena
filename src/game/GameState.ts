import type {Tetrimino} from '../types/Tetrimino';

import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants/board';
import {ColorEnum} from '../enums/color.enum';
import {canPlaceTetrimino,} from '../utils/constraints';

import {ActionsEnum} from '../enums/actions.enum';
import {
    checkIfLineIsFull,
    getNewTetriminoFromTetriminoPiece,
    getShadowTetriminos,
    getShapeFromTetrimino
} from '../utils/tetriminoHelper';
import {Actions} from "./Actions";
import {getRandomTetriminoPiece, TetriminoPiece} from "../constants/tetriminos";

export class GameState {
    protected board: ColorEnum[][] = new Array(BOARD_HEIGHT)
        .fill(ColorEnum.NONE)
        .map(() => new Array(BOARD_WIDTH).fill(ColorEnum.NONE));

    protected currentTetrimino: Tetrimino;
    protected shadowTetrimino: Tetrimino;

    protected nextTetriminos: TetriminoPiece[];

    protected score: number = 0;
    public isGameOver: boolean = false;
    deletedLines: number[] = [];
    protected numberAddedLines: number = 0;
    protected currentTetriminoFreezed: boolean = false;

    constructor(currentTetrimino?: Tetrimino, nextTetriminos?: TetriminoPiece[]) {
        this.currentTetrimino = currentTetrimino || getNewTetriminoFromTetriminoPiece(getRandomTetriminoPiece());
        this.nextTetriminos = nextTetriminos || new Array(5)
            .fill({})
            .map(() => getRandomTetriminoPiece());
        this.shadowTetrimino = getShadowTetriminos(this.currentTetrimino, this.board);
    }

    private drawShapeOnBoard(tetrimino: Tetrimino) {
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

    private checkForGameOver(nextTetrimino: TetriminoPiece) {
        let newTetrimino = getNewTetriminoFromTetriminoPiece(this.nextTetriminos.shift()!);

        if (canPlaceTetrimino(newTetrimino, this.board)) {
            this.currentTetriminoFreezed = true;
            this.currentTetrimino = newTetrimino;
            this.nextTetriminos.push(nextTetrimino);
        } else {
            this.isGameOver = true;
        }
    }
    handleAction(action: ActionsEnum): boolean {
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

        if ((action === ActionsEnum.GO_DOWN && !hasActionBeenDone) || action === ActionsEnum.INSTANT_PLACE) {
            this.drawShapeOnBoard(this.currentTetrimino);
            this.checkBreakLine();
            this.checkForGameOver(getRandomTetriminoPiece());
        }

        this.shadowTetrimino = getShadowTetriminos(this.currentTetrimino, this.board);
        return hasActionBeenDone;
    }
}