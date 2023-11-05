import type {Tetrimino} from './types/Tetrimino';

import {BOARD_HEIGHT, BOARD_WIDTH} from './constants/board';
import {ColorEnum} from './enums/color.enum';
import {
    canMoveDown,
    canMoveLeft,
    canMoveRight,
    canPlaceTetrimino, canRotate,
} from './utils/constraints';
import type {PlayerStateDTO} from './types/PlayerStateDTO';

import {getRandomTetrimino} from './constants/tetriminos';
import {ActionsEnum} from './enums/actions.enum';
import {clockworkRotateTetrimino, getShapeFromTetrimino} from './utils/tetriminoHelper';

export class PlayerGameState {
    public board: ColorEnum[][] = new Array(BOARD_HEIGHT)
        .fill(ColorEnum.NONE)
        .map(() => new Array(BOARD_WIDTH).fill(ColorEnum.NONE));

    private currentTetrimino: Tetrimino = this.getRandomTetrimino();
    private shadowTetrimino: Tetrimino = this.getShadowTetriminos();

    private nextTetriminos: Tetrimino[] = new Array(5)
        .fill({})
        .map(() => this.getRandomTetrimino());

    public score: number = 0;
    public isGameOver: boolean = false;
    public deletedLines: number[] = [];
    public currentTetriminoFreezed: boolean = false;

    private getRandomTetrimino(): Tetrimino {
        return {
            position_x: BOARD_WIDTH / 2 - 1,
            position_y: 0,
            tetriminoPiece: getRandomTetrimino(),
        };
    }

    private getShadowTetriminos() {
        let copiedTetrimino = Object.assign({}, this.currentTetrimino);
        copiedTetrimino.tetriminoPiece = Object.assign(
            {},
            this.currentTetrimino.tetriminoPiece
        );
        while (canMoveDown(copiedTetrimino, this.board)) {
            copiedTetrimino.position_y++;
        }

        copiedTetrimino.tetriminoPiece.color = ColorEnum.SHADOW;
        return copiedTetrimino;
    }

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
            if (row.filter(block => block !== ColorEnum.NONE).length === row.length) {
                this.deletedLines.push(index);
                this.board.splice(index, 1);
                this.board.unshift(new Array(BOARD_WIDTH).fill(ColorEnum.NONE));
                this.score++;
            }
        });
    }

    private moveLeft() {
        if (canMoveLeft(this.currentTetrimino, this.board))
            this.currentTetrimino.position_x--;
    }

    private moveRight() {
        if (canMoveRight(this.currentTetrimino, this.board))
            this.currentTetrimino.position_x++;
    }

    private rotate() {
        if (canRotate(this.currentTetrimino, this.board)) {
            clockworkRotateTetrimino(this.currentTetrimino);
        }
    }

    public handleAction(action: ActionsEnum) {
        this.undrawShape(this.currentTetrimino);
        this.undrawShape(this.shadowTetrimino);

        switch (action) {
            case ActionsEnum.GO_LEFT:
                this.moveLeft();
                break;

            case ActionsEnum.GO_RIGHT:
                this.moveRight();
                break;

            case ActionsEnum.ROTATE:
                this.rotate();
                break;

            case ActionsEnum.GO_DOWN:
                this.moveDown();
                break;

            case ActionsEnum.INSTANT_PLACE:
                this.instantPlaceTetrimino();
                break;
        }
        this.shadowTetrimino = this.getShadowTetriminos();
        this.drawShape(this.currentTetrimino);
        this.drawShape(this.shadowTetrimino);
    }

    private instantPlaceTetrimino() {
        while (canMoveDown(this.currentTetrimino, this.board)) {
            this.currentTetrimino.position_y++;
        }

        this.drawShape(this.currentTetrimino);
        this.checkBreakLine();
        if (canPlaceTetrimino(this.nextTetriminos[0], this.board)) {
            this.switchCurrentTetrimino();
        } else {
            this.isGameOver = true;
        }
    }

    private moveDown() {
        if (canMoveDown(this.currentTetrimino, this.board)) {
            this.currentTetrimino.position_y++;
            return;
        }

        this.drawShape(this.currentTetrimino);
        this.checkBreakLine();
        if (canPlaceTetrimino(this.nextTetriminos[0], this.board)) {
            this.switchCurrentTetrimino();
        } else {
            this.isGameOver = true;
        }
    }

    private switchCurrentTetrimino() {
        this.currentTetriminoFreezed = true;
        this.currentTetrimino = this.nextTetriminos.shift()!; // ! is a non-null assertion operator since shift() can return undefined if the array is empty
        this.nextTetriminos.push(this.getRandomTetrimino());
    }

    getPlayerState(): PlayerStateDTO {
        return {
            board: this.board,
            score: this.score,
            nextTetriminos: this.nextTetriminos.map(tetrimino => {
                return {
                    shape: getShapeFromTetrimino(tetrimino),
                    color: tetrimino.tetriminoPiece.color,
                };
            }),
            isGameOver: this.isGameOver,
            deletedLines: this.deletedLines,
            currentTetriminoFreezed: this.currentTetriminoFreezed,
        };
    }
}
