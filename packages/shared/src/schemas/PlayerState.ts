import { ArraySchema, Schema, type } from '@colyseus/schema';
import { ActionsEnum, Game, GameStateDTO, Tetrimino as TetriminoDTO } from '@jmischler72/core';
import { matrixToBlocks } from './utils';

export class Block extends Schema {
  @type('number') x = 0;
  @type('number') y = 0;
  @type('number') value = 0;
}

export class Tetrimino extends Schema {
  @type('number') x = 0;
  @type('number') y = 0;
  @type('number') rotation = 0;
  @type('number') color = 0;

  fromTetrimino(tetrimino: TetriminoDTO) {
    this.x = tetrimino.position_x;
    this.y = tetrimino.position_y;
    this.rotation = tetrimino.rotation;
    this.color = tetrimino.color;
  }
}

export class Player extends Schema {
  @type([Block]) board: ArraySchema<Block> = new ArraySchema<Block>();
  @type(Tetrimino) currentTetrimino: Tetrimino = new Tetrimino();
  @type(Tetrimino) shadowTetrimino: Tetrimino = new Tetrimino();
  @type('number') score = 0;
  @type(['number']) nextTetriminos: ArraySchema<number> = new ArraySchema<number>();
  @type('boolean') isGameOver = false;
  @type(['number']) deletedLines: ArraySchema<number> = new ArraySchema<number>();
  @type('number') numberAddedLines = 0;
  @type('boolean') currentTetriminoFreezed = false;

  constructor(seed: number) {
    super();
    this.gameInstance = new Game(seed);
  }

  private gameInstance: Game;

  recreateGameInstance(seed: number) {
    this.gameInstance = new Game(seed);
  }

  handleAction(action: ActionsEnum) {
    this.gameInstance.updateGameState(action);
    this.updateFromGameStateDTO(this.gameInstance.getCurrentGameState());
  }

  updateFromGameStateDTO(gameState: GameStateDTO) {
    this.board = new ArraySchema<Block>(...matrixToBlocks(gameState.board));

    this.currentTetrimino = new Tetrimino();
    this.currentTetrimino.fromTetrimino(gameState.currentTetrimino);

    this.shadowTetrimino = new Tetrimino();
    this.shadowTetrimino.fromTetrimino(gameState.shadowTetrimino);

    this.nextTetriminos = new ArraySchema<number>(...gameState.nextTetriminos);

    this.score = gameState.score;
    this.isGameOver = gameState.isGameOver;

    this.deletedLines = new ArraySchema<number>(...gameState.deletedLines);
    this.numberAddedLines = gameState.numberAddedLines;
    this.currentTetriminoFreezed = gameState.currentTetriminoFreezed;
  }
}
