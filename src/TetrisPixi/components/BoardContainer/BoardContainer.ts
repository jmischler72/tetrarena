import * as PIXI from 'pixi.js';
import Board from '../Board/Board';
import * as TWEEN from '@tweenjs/tween.js';
import {
    placedTetriminosTween,
    scoreAnimationTween,
} from './BoardContainerAnimation';
import NextTetriminosContainer from './NextTetriminosContainer/NextTetriminosContainer';
import {ColorEnum, type GameStateDTO} from '@jmischler72/core-tetris';

export default class BoardContainer extends PIXI.Container {
    private readonly board: Board;
    private readonly scoreText: PIXI.Text;
    private readonly nextTetriminosContainer: NextTetriminosContainer;
    private currentGameState: string = "";
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

        this.nextTetriminosContainer = new NextTetriminosContainer();
        this.nextTetriminosContainer.position.set(this.board.width, 0);

        this.addChild(this.board, this.scoreText, bg, this.nextTetriminosContainer);
    }

    updatePlayerBoard(gameState: GameStateDTO) {
        if (
            this.currentGameState != null &&
            JSON.stringify(gameState) === this.currentGameState
        ) {
            return;
        }

        let offset = 10;

        if (gameState.deletedLines.length > 0) {
            offset = 20;
            // this.hitAnimation();
            gameState.deletedLines.forEach(line => {
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
        this.board.updateTetrimino(gameState.shadowTetrimino, ColorEnum.SHADOW);
        this.board.updateTetrimino(gameState.currentTetrimino, gameState.currentTetrimino.color);

        this.nextTetriminosContainer.renderTetriminoContainers(gameState.nextTetriminos);
        this.currentGameState = JSON.stringify(gameState);
    }

    gameOverAnimation() {
        let position = {
            x: this.position.x,
        };
        let shaking = new TWEEN.Tween(position)
            .to({x: this.position.x + 20}, 100)
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
