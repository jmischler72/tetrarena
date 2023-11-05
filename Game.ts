import { PlayerGameState } from './PlayerGameState';
import { ActionsEnum } from './enums/actions.enum';
import { GAME_SPEED } from './constants/game';
import {PlayerStateDTO} from "./types/PlayerStateDTO";

export class Game {
  private gameTimer: null | ReturnType<typeof setTimeout> = null;
  public readonly playerGameState: PlayerGameState = new PlayerGameState();

  constructor(private callback: (playerState: PlayerStateDTO)=> void) {
    console.log('Game Started');
  }

  private callbackOnPlayerStateUpdate() {
    this.callback(this.playerGameState.getPlayerState());
    this.playerGameState.deletedLines = [];
    this.playerGameState.currentTetriminoFreezed = false;
  }

  handleAction(action: ActionsEnum) {
    this.playerGameState.handleAction(action);
    this.callbackOnPlayerStateUpdate();
  }

  startGame(){
    this.updateGame();
  }

  private updateGame() {
    this.gameTimer = setTimeout(this.updateGame.bind(this), GAME_SPEED); // https://stackoverflow.com/a/5911280

    if (!this.playerGameState.isGameOver) {
      this.playerGameState.handleAction(ActionsEnum.GO_DOWN);
      this.callbackOnPlayerStateUpdate();
    } else {
      clearTimeout(this.gameTimer);
    }
  }
}




