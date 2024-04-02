import type {Tetrimino} from '../types/Tetrimino';

import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants/board';
import {ColorEnum} from '../enums/color.enum';
import {canPlaceTetrimino,} from '../utils/constraints';

import {ActionsEnum} from '../enums/actions.enum';
import {checkIfLineIsFull, getNewTetrimino, getShadowTetriminos, getShapeFromTetrimino} from '../utils/tetriminoHelper';
import {Actions} from "./Actions";
import {tetriminoPieces} from "../constants/tetriminos";
import {MersenneTwister19937, Random} from "random-js";

export class GameState {
    protected board: ColorEnum[][] = new Array(BOARD_HEIGHT)
        .fill(ColorEnum.NONE)
        .map(() => new Array(BOARD_WIDTH).fill(ColorEnum.NONE));

    protected currentTetrimino: Tetrimino;
    protected shadowTetrimino: Tetrimino;
    protected nextTetriminos: ColorEnum[];

    protected score: number = 0;
    public isGameOver: boolean = false;
    protected deletedLines: number[] = [];
    protected numberAddedLines: number = 0;
    protected currentTetriminoFreezed: boolean = false;

    private random: Random;


    constructor(seed?: number) {
        this.random = new Random(MersenneTwister19937.seed(seed || Date.now()));

        this.currentTetrimino = getNewTetrimino(this.getRandomColor());
        this.shadowTetrimino = getShadowTetriminos(this.currentTetrimino, this.board);

        this.nextTetriminos = new Array(5)
            .fill({})
            .map(() => this.getRandomColor());

    }

    protected drawShapeOnBoard(tetrimino: Tetrimino) {
        for (let j = 0; j < getShapeFromTetrimino(tetrimino).length; j++) {
            for (let k = 0; k < getShapeFromTetrimino(tetrimino)[j].length; k++) {
                if (getShapeFromTetrimino(tetrimino)[j][k] === 1)
                    this.board[tetrimino.position_y + j][tetrimino.position_x + k] =
                        tetrimino.color;
            }
        }
        this.currentTetriminoFreezed = true;
    }

    protected checkBreakLine() {
        this.board.forEach((row, index) => {
            if (checkIfLineIsFull(row)) {
                this.deletedLines.push(index);
                this.board.splice(index, 1);
                this.board.unshift(new Array(BOARD_WIDTH).fill(ColorEnum.NONE));
                this.score++;
            }
        });
    }

    protected checkForGameOver() {
        let newTetrimino = getNewTetrimino(this.nextTetriminos.shift()!);

        if (canPlaceTetrimino(newTetrimino, this.board)) {
            this.currentTetrimino = newTetrimino;
            this.nextTetriminos.push(this.getRandomColor());
        } else {
            this.isGameOver = true;
        }
    }

    protected handleAction(action: ActionsEnum): boolean {
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

        return hasActionBeenDone;
    }

    updateGameState(action: ActionsEnum): void {
        if (this.isGameOver) return;
        let hasActionBeenDone = this.handleAction(action);

        if ((action === ActionsEnum.GO_DOWN && !hasActionBeenDone) || action === ActionsEnum.INSTANT_PLACE) {
            this.drawShapeOnBoard(this.currentTetrimino);
            this.checkBreakLine();
            this.checkForGameOver();
        }

        this.shadowTetrimino = getShadowTetriminos(this.currentTetrimino, this.board);
    }

    addLines(lines: number) {
        this.numberAddedLines = lines;

        for (let i = 0; i < lines; i++) {
            const list = Array.from({length: this.board[0].length}, () => ColorEnum.BLOCK);

            list[Math.floor(Math.random() * list.length)] = ColorEnum.NONE;

            this.board.push(list);
        }
    }

    private getRandomColor(): ColorEnum {
        return tetriminoPieces[this.random.integer(0, tetriminoPieces.length - 1)].color;
    }
}