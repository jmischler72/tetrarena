import { GameState } from './GameState';
import { ActionsEnum } from './enums/actions.enum';
import { GAME_SPEED } from './constants/game';
import {GameStateDTO} from "./types/GameStateDTO";

export class Game {
  private gameTimer: null | ReturnType<typeof setTimeout> = null;
  public readonly gameState: GameState = new GameState();

  constructor(private callback: (playerState: GameStateDTO)=> void) {
    console.log('Game Started');
  }

  private callbackOnPlayerStateUpdate() {
    this.callback(this.gameState.getCurrentGameState());
    this.gameState.deletedLines = [];
    this.gameState.currentTetriminoFreezed = false;
  }

  handleAction(action: ActionsEnum) {
    this.gameState.handleAction(action);
    this.callbackOnPlayerStateUpdate();
  }

  startGame(){
    this.updateGame();
  }

  private updateGame() {
    this.gameTimer = setTimeout(this.updateGame.bind(this), GAME_SPEED); // https://stackoverflow.com/a/5911280

    if (!this.gameState.isGameOver) {
      this.gameState.handleAction(ActionsEnum.GO_DOWN);
      this.callbackOnPlayerStateUpdate();
    } else {
      clearTimeout(this.gameTimer);
    }
  }
}




