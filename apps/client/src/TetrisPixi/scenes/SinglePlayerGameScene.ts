import GameScene from './GameScene';
import BoardContainer from '../components/BoardContainer/BoardContainer';
import * as TWEEN from '@tweenjs/tween.js';
import type { GameStateDTO } from '@jmischler72/core';
import { SinglePlayerInstance } from '@jmischler72/core';
import type { IScene } from '../Manager';

export default class SinglePlayerGameScene extends GameScene implements IScene {
  private readonly playerBoard: BoardContainer;

  constructor(private readonly instance: SinglePlayerInstance) {
    super();
    this.playerBoard = new BoardContainer();

    this.addChild(this.playerBoard);
  }

  update(): void {
    this.stats.begin();
    TWEEN.update();
    const gameStateDTO: GameStateDTO = this.instance.game.getCurrentGameState();
    if (gameStateDTO.isGameOver) {
      this.instance.restartGame();
    } else {
      this.playerBoard.updatePlayerBoard(gameStateDTO, '');
    }
    this.stats.end();
  }

  resize(screenWidth: number, screenHeight: number): void {
    this.playerBoard.scale.set(screenHeight / 900);

    this.position.set(screenWidth / 2 - this.width / 2, screenHeight / 2 - this.height / 2);

    this.playerBoard.position.set(
      this.width / 2 - this.playerBoard.width / 2,
      this.height / 2 - this.playerBoard.height / 2
    );
  }
}
