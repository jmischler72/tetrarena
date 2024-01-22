import GameScene from './GameScene';
import BoardContainer from '../components/BoardContainer/BoardContainer';
import * as TWEEN from '@tweenjs/tween.js';
import { get } from 'svelte/store';
import {
  socketManager,
} from '../routes/multiplayer/multiplayerStores';
import type {IScene} from "../Manager";
import {multiPlayerStore} from "../routes/multiplayer/[slug]/multiPlayerStore";
import type {PilotedMultiplayerGame} from "@jmischler72/core-tetris";

export default class MultiPlayerGameScene extends GameScene implements IScene{
  private readonly playerBoard: BoardContainer;
  private readonly oppBoard: BoardContainer;
  private isGameOver: boolean = false;

  constructor() {
    super();

    this.playerBoard = new BoardContainer();
    this.oppBoard = new BoardContainer();
    this.oppBoard.position.set(
      this.playerBoard.x + this.playerBoard.width,
      this.playerBoard.y
    );
    this.addChild(this.playerBoard, this.oppBoard);
  }

  update(): void {
    this.stats.begin();
    TWEEN.update();

    let gameStates: Map<string, PilotedMultiplayerGame> = get(multiPlayerStore);
    let socketId = get(socketManager).getSocketId();

    if (gameStates && socketId && !this.isGameOver) {
      gameStates.forEach(( value: PilotedMultiplayerGame, key: string) => {
        let gameState = value.getCurrentGameState();
        if (key == socketId) {
          this.playerBoard.updatePlayerBoard(gameState);
        } else {
          this.oppBoard.updatePlayerBoard(gameState);
        }
        if(gameState.isGameOver){
          this.isGameOver = true;
          if (key == socketId) {
            this.playerBoard.gameOverAnimation();
          } else {
            this.oppBoard.gameOverAnimation();
          }
        }
      });
    }

    this.stats.end();
  }

  resize(screenWidth: number, screenHeight: number): void {
    this.playerBoard.position.set(
      screenWidth / 2 - this.playerBoard.width / 2 - this.oppBoard.width/2 - 15 ,
      screenHeight / 2 - this.playerBoard.height / 2
    );

    this.oppBoard.position.set(
      screenWidth / 2 - this.oppBoard.width / 2 + this.playerBoard.width/2 + 15,
      screenHeight / 2 - this.oppBoard.height / 2
    );
  }
}
