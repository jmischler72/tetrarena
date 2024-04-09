import * as PIXI from 'pixi.js';
import Board from '../Board/Board';
import { currentPlayerBorderTween, placedTetriminosTween, scoreAnimationTween } from './BoardContainerAnimation';
import NextTetriminosContainer from './NextTetriminosContainer/NextTetriminosContainer';
import { ColorEnum, type GameStateDTO } from '@jmischler72/core';

export default class BoardContainer extends PIXI.Container {
  private readonly board: Board;
  private readonly scoreText: PIXI.Text;
  private readonly nameText: PIXI.Text;
  private readonly nextTetriminosContainer: NextTetriminosContainer;
  private currentGameState = '';
  private initialPosition: number | null = null;

  constructor() {
    super();
    this.sortableChildren = true;

    this.board = new Board();

    this.scoreText = new PIXI.Text('0', {
      fontSize: 30,
      stroke: '#000',
      strokeThickness: 2,
      fill: 0xffffff,
      align: 'center',
    });
    this.scoreText.anchor.set(0.5, 0.5);

    this.scoreText.position.set(this.board.width / 2, 0);
    this.scoreText.zIndex = 2;

    this.nameText = new PIXI.Text('0', {
      fontSize: 30,
      stroke: '#000',
      strokeThickness: 2,
      fill: 0xffffff,
      align: 'center',
    });

    this.nameText.position.set(this.board.width / 2 - 100, 0);

    this.nextTetriminosContainer = new NextTetriminosContainer();
    this.nextTetriminosContainer.position.set(this.board.width + 10, 0);

    this.addChild(this.board, this.scoreText, this.nextTetriminosContainer, this.nameText);
  }

  renderPlayerBorder() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill('rgba(0,0,0,0)');
    // set the line style to have a width of 5 and set the color to red
    graphics.lineStyle(3, 0xff0000);
    graphics.alpha = 0.3;
    // draw a rectangle
    graphics.drawRect(0, 0, this.width, this.height - this.scoreText.height / 2);
    graphics.zIndex = 1;

    this.addChild(graphics);

    currentPlayerBorderTween(graphics).start();
  }

  updatePlayerBoard(gameState: GameStateDTO, name: string) {
    if (this.currentGameState != null && JSON.stringify(gameState) === this.currentGameState) {
      return;
    }

    console.log(gameState.currentTetriminoFreezed);

    this.nameText.text = name;

    let offset = 10;

    if (gameState.deletedLines.length > 0) {
      offset = 20;
      // this.hitAnimation();
      gameState.deletedLines.forEach((line) => {
        this.board.animateLineBreak(line);
      });
    }

    if (gameState.currentTetriminoFreezed) {
      // console.log('freeze');
      this.posedAnimation(offset);
    }

    if (gameState.score != parseInt(this.scoreText.text)) {
      this.scoreAnimation(gameState.score);
    }
    try {
      this.board.updateFromBoard(gameState.board);
    } catch (e) {
      console.log(e);
    }
    this.board.updateTetrimino(gameState.shadowTetrimino, ColorEnum.SHADOW);
    this.board.updateTetrimino(gameState.currentTetrimino, gameState.currentTetrimino.color);

    this.nextTetriminosContainer.renderTetriminoContainers(gameState.nextTetriminos);
    this.currentGameState = JSON.stringify(gameState);
  }

  private posedAnimation(offset: number) {
    if (!this.initialPosition) this.initialPosition = this.position.y;
    placedTetriminosTween(this, this.initialPosition, offset).start();
  }

  private scoreAnimation(score: number) {
    scoreAnimationTween(this.scoreText)
      .onStart(() => {
        this.scoreText.text = score;
        this.scoreText.style.fill = 0xffff00;
        setTimeout(() => (this.scoreText.style.fill = 0xffffff), 300);
      })
      .start();
  }
}
