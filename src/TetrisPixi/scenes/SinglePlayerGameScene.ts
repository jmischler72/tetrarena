import GameScene from "./GameScene";
import BoardContainer from "../components/BoardContainer/BoardContainer";
import * as TWEEN from "@tweenjs/tween.js";
import type {GameStateDTO} from "@jmischler72/core-tetris";
import {SinglePlayerInstance} from "@jmischler72/core-tetris";
import type {IScene} from "../Manager";
import * as PIXI from "pixi.js";

export default class SinglePlayerGameScene extends GameScene implements IScene {
    private readonly playerBoard: BoardContainer;

    constructor(private readonly instance: SinglePlayerInstance) {
        super();
        this.playerBoard = new BoardContainer();

        let quitGameText = new PIXI.Text('Press ESC to return home', {
            fontSize: 30,
            stroke: '#000',
            strokeThickness: 2,
            fill: 0xffffff,
            align: 'center',
        });

        this.addChild(this.playerBoard, quitGameText );
    }

    update(): void {
        this.stats.begin();
        TWEEN.update();
        const gameStateDTO: GameStateDTO = this.instance.game.getCurrentGameState();
        if (gameStateDTO.isGameOver) {
            this.instance.restartGame();
        } else {
            this.playerBoard.updatePlayerBoard(gameStateDTO);
        }
        this.stats.end();
    }

    resize(screenWidth: number, screenHeight: number): void {
        this.playerBoard.position.set(
            screenWidth / 2 - this.playerBoard.width / 2,
            screenHeight / 2 - this.playerBoard.height / 2
        );
    }
}