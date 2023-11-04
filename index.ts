import { PlayerGameState } from './PlayerGameState';
import { ActionsEnum } from './enums/actions.enum';
import { GAME_SPEED } from './constants/game';
import {PlayerGameStateUpdatedEvent} from "./constants/events";

export class Game {
  private gameTimer: null | ReturnType<typeof setTimeout> = null;
  public readonly playerGameState: PlayerGameState = new PlayerGameState();

  constructor() {
    this.updateGame();
    console.log('Game Started');
  }

  handleKeydown(event: KeyboardEvent) {
    this.playerGameState.handleInput(event.code);
    this.dispatchPlayerStateEvent();
  }

  private dispatchPlayerStateEvent() {
    const playerGameStateEvent = new CustomEvent(PlayerGameStateUpdatedEvent, { detail: this.playerGameState });
    dispatchEvent(playerGameStateEvent);
    this.playerGameState.deletedLines = [];
    this.playerGameState.currentTetriminoFreezed = false;
  }

  private updateGame() {
    this.gameTimer = setTimeout(this.updateGame.bind(this), GAME_SPEED); // https://stackoverflow.com/a/5911280

    if (!this.playerGameState.isGameOver) {
      this.playerGameState.handleInput(ActionsEnum.ARROW_DOWN);
      this.dispatchPlayerStateEvent();
    } else {
      clearTimeout(this.gameTimer);
    }
  }
}




