import {PlayerStateDTO} from "./types/PlayerStateDTO";
import {ActionsEnum} from "./enums/actions.enum";
import {GAME_SPEED} from "./constants/game";
import {Game} from "./Game";

export class SinglePlayerGame extends Game{
    private gameTimer: null | ReturnType<typeof setTimeout> = null;

    constructor(private callback: (playerState: PlayerStateDTO)=> void) {
        super();
        console.log('Game Started');
    }

    private callbackOnPlayerStateUpdate() {
        this.callback(this.playerGameState.getPlayerState());
        this.playerGameState.deletedLines = [];
        this.playerGameState.currentTetriminoFreezed = false;
    }

    handleActionWithCallback(action: ActionsEnum) {
        this.handleAction(action);
        this.callbackOnPlayerStateUpdate();
    }

    startGame(){
        this.updateGameOnTimer();
    }

    private updateGameOnTimer() {
        this.gameTimer = setTimeout(this.updateGameOnTimer.bind(this), GAME_SPEED); // https://stackoverflow.com/a/5911280

        if (!this.playerGameState.isGameOver) {
            this.updateGame();
            this.callbackOnPlayerStateUpdate();
        } else {
            clearTimeout(this.gameTimer);
        }
    }
}
