import type { Tetrimino } from '../types/Tetrimino';

import { BOARD_HEIGHT, BOARD_WIDTH } from '../constants/game';
import { ColorEnum } from '../enums/color.enum';
import { canPlaceTetrimino } from '../utils/constraints.helpers';

import { ActionsEnum } from '../enums/actions.enum';
import { checkIfLineIsFull, getNewTetrimino, getShadowTetriminos, getShapeFromTetrimino } from '../utils/tetrimino.helpers';
import { Actions } from './Actions';
import { uid } from 'uid';
import { CustomRandom } from '../game/CustomRandom';

export class GameState {
  protected board: ColorEnum[][] = new Array(BOARD_HEIGHT).fill(ColorEnum.NONE).map(() => new Array(BOARD_WIDTH).fill(ColorEnum.NONE));

  protected currentTetrimino: Tetrimino;
  protected shadowTetrimino: Tetrimino;
  protected nextTetriminos: ColorEnum[];

  protected score = 0;
  public isGameOver = false;
  protected linesId: string[] = Array.from(new Array(BOARD_HEIGHT), () => uid());
  protected numberAddedLines = 0;

  private random: CustomRandom;

  constructor(seed?: number) {
    this.random = new CustomRandom(seed || Date.now());

    this.currentTetrimino = getNewTetrimino(this.random.getFirstPiece());
    this.shadowTetrimino = getShadowTetriminos(this.currentTetrimino, this.board);

    this.nextTetriminos = new Array(5).fill({}).map(() => this.random.tgm3Randomizer());
  }

  protected drawShapeOnBoard(tetrimino: Tetrimino) {
    for (let j = 0; j < getShapeFromTetrimino(tetrimino).length; j++) {
      for (let k = 0; k < getShapeFromTetrimino(tetrimino)[j].length; k++) {
        if (getShapeFromTetrimino(tetrimino)[j][k] === 1) this.board[tetrimino.position_y + j][tetrimino.position_x + k] = tetrimino.color;
      }
    }
  }

  protected checkBreakLine() {
    this.board.forEach((row, index) => {
      if (checkIfLineIsFull(row)) {
        this.board.splice(index, 1);
        this.board.unshift(new Array(BOARD_WIDTH).fill(ColorEnum.NONE));
        this.linesId.splice(index, 1);
        this.linesId.unshift(uid());

        this.score++;
      }
    });
  }

  protected checkForGameOver() {
    const newTetrimino = getNewTetrimino(this.nextTetriminos.shift()!);

    if (canPlaceTetrimino(newTetrimino, this.board)) {
      this.currentTetrimino = newTetrimino;
      this.nextTetriminos.push(this.random.tgm3Randomizer());
    } else {
      this.isGameOver = true;
    }
  }

  protected handleAction(action: ActionsEnum): boolean {
    let hasActionBeenDone = false;

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
    const hasActionBeenDone = this.handleAction(action);

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
      const list = Array.from({ length: this.board[0].length }, () => ColorEnum.BLOCK);

      list[Math.floor(Math.random() * list.length)] = ColorEnum.NONE;

      this.board.push(list);
    }
  }
}
