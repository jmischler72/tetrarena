import { PlayerGameState } from './PlayerGameState';
import { ActionsEnum } from './enums/actions.enum';
import { GAME_SPEED } from './constants/game';
import { playerStateStore } from '../soloStore';

export class Game {
  private gameTimer: null | ReturnType<typeof setTimeout> = null;
  public readonly playerGameState: PlayerGameState = new PlayerGameState();

  constructor() {
    this.updateGame();
    console.log('Game Started');
    window.onkeydown = this.handleKeydown.bind(this);
  }

  dispatchPlayerStateEvent() {
    playerStateStore.update(() => this.playerGameState.getPlayerState());
    this.playerGameState.deletedLines = [];
    this.playerGameState.currentTetriminoFreezed = false;
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return;
    }
    this.playerGameState.handleInput(event.code);
    this.dispatchPlayerStateEvent();
    event.preventDefault();
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




