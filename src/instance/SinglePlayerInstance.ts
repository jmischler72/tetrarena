import {ActionsEnum} from 'enums/actions.enum';
import {GAME_SPEED} from 'constants/game';
import {Game} from "game/Game";

export class SinglePlayerInstance {
    private gameTimer: null | ReturnType<typeof setTimeout> = null;
    public readonly game: Game = new Game();

    constructor() {
        console.log('Game Started');
    }

    handleAction(action: ActionsEnum) {
        this.game.updateGameState(action);
    }

    startGame() {
        this.updateGame();
    }

    stopGame() {
        if (this.gameTimer) clearTimeout(this.gameTimer);
    }

    private updateGame() {
        this.gameTimer = setTimeout(this.updateGame.bind(this), GAME_SPEED); // https://stackoverflow.com/a/5911280

        if (!this.game.isGameOver) {
            this.handleAction(ActionsEnum.GO_DOWN);
        } else {
            this.stopGame();
        }
    }
}




