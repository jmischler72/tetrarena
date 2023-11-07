import {GameStateDTO} from "./types/GameStateDTO";
import {GAME_SPEED} from "./constants/game";
import {ActionsEnum} from "./enums/actions.enum";
import {Game} from "./Game";

export class SinglePlayerGame extends Game{
    private gameTimer: null | ReturnType<typeof setTimeout> = null;

    constructor(private callback: (playerState: GameStateDTO) => void) {
        super();
        console.log('Game Started');
    }

    startGame(){
        this.updateGame();
    }

    private callbackOnPlayerStateUpdate() {
        this.callback(this.getCurrentGameState());
        this.clearOnDispatch();
    }

    private updateGame() {
        this.gameTimer = setTimeout(this.updateGame.bind(this), GAME_SPEED); // https://stackoverflow.com/a/5911280

        if (!this.isGameOver) {
            this.handleAction(ActionsEnum.GO_DOWN);
            this.callbackOnPlayerStateUpdate();
        } else {
            clearTimeout(this.gameTimer);
        }
    }
}