import * as PIXI from 'pixi.js';
import Board from '../Board/Board';
import * as TWEEN from '@tweenjs/tween.js';
import { placedTetriminosTween, scoreAnimationTween } from './SecondBoardContainerAnimation';
import type { GameStateDTO } from '@jmischler72/core';

export default class SecondBoardContainer extends PIXI.Container {
  private readonly board: Board;
  private readonly scoreText: PIXI.Text;
  private currentGameState: GameStateDTO | null = null;
  private initialPosition: number | null = null;

  constructor() {
    super();
    this.sortableChildren = true;

    this.board = new Board();

    let bg = new PIXI.Graphics();
    bg.beginFill(0x3b3b3b);
    bg.drawRect(0, 0, this.board.width, this.board.height);
    bg.zIndex = -1;
    bg.position.set(0, 0);

    this.scoreText = new PIXI.Text('0', {
      fontSize: 30,
      stroke: '#000',
      strokeThickness: 2,
      fill: 0xffffff,
      align: 'center',
    });
    this.scoreText.anchor.set(0.5, 0.5);

    this.scoreText.position.set(this.board.width / 2, 0);

    this.addChild(this.board, this.scoreText, bg);
  }

  updatePlayerBoard(gameState: GameStateDTO) {
    if (this.currentGameState != null && gameState === this.currentGameState) {
      return;
    }
    this.currentGameState = gameState;

    if (gameState.isGameOver) {
      this.gameOverAnimation();
    }

    let offset = 5;

    if (gameState.deletedLines.length > 0) {
      offset = offset + gameState.deletedLines.length * 3;
      // this.hitAnimation();
      gameState.deletedLines.forEach((line) => {
        this.board.animateLineBreak(line);
      });
    }

    if (gameState.currentTetriminoFreezed) {
      this.posedAnimation(offset);
    }

    if (gameState.score != parseInt(this.scoreText.text)) {
      this.scoreAnimation(gameState.score);
    }

    this.board.updateFromBoard(gameState.board);
  }

  gameOverAnimation() {
    let position = {
      x: this.position.x,
    };
    let shaking = new TWEEN.Tween(position)
      .to({ x: this.position.x + 20 }, 100)
      .onUpdate(() => {
        this.position.x = position.x;
      })
      .yoyo(true)
      .repeat(5);
    shaking.start();
  }

  posedAnimation(offset: number) {
    if (!this.initialPosition) this.initialPosition = this.position.y;
    placedTetriminosTween(this, this.initialPosition, offset).start();
  }

  scoreAnimation(score: number) {
    scoreAnimationTween(this.scoreText)
      .onStart(() => {
        this.scoreText.text = score;
        this.scoreText.style.fill = 0xffff00;
        setTimeout(() => (this.scoreText.style.fill = 0xffffff), 300);
      })
      .start();
  }

  // hitAnimation() {
  //     console.log("animation:hit");
  //     let containerScale = {y: this.scale.y};
  //     let scaleIn = new TWEEN.Tween(containerScale)
  //         .to({y: 0.95}, 100)
  //         .onUpdate(() => {
  //             this.scale.y = containerScale.y;
  //         });
  //
  //     let scaleOut = new TWEEN.Tween(containerScale)
  //         .to({y: 1}, 1000)
  //         .easing(TWEEN.Easing.Exponential.Out)
  //         .onUpdate(() => {
  //             this.scale.y = containerScale.y;
  //         });
  //
  //     scaleIn.chain(scaleOut);
  //     scaleIn.start();
  // }
}
