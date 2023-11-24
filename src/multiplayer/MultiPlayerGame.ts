import {ActionsEnum} from '../enums/actions.enum';
import {GAME_SPEED} from '../constants/game';
import {GameStateDTO} from "../types/GameStateDTO";
import {Player} from "./Player";

export class MultiPlayerGame {
    private gameTimer: null | ReturnType<typeof setTimeout> = null;
    public readonly gameStates: Map<string, Player> = new Map<
        string,
        Player
    >();

    constructor(private ids: string[], private readonly callback: (id: string, playerState: GameStateDTO) => void) {
        console.log('Game Started');

        ids.forEach((id) => {
            this.gameStates.set(id, new Player());
        })

        ids.forEach((id) => {
            this.gameStates.get(id).switchOpponent(this.getRandomOppIdForPlayer(id))
        })
    }

    private getRandomOppIdForPlayer(playerId: string) {
        let ids = this.ids.filter((id) => id !== playerId);
        let id = ids[Math.floor(Math.random() * ids.length)];
        return this.gameStates.get(id);
    }

    private callbackOnGameStateUpdate(id: string) {
        this.callback(id, this.gameStates.get(id).getCurrentGameState());
        this.gameStates.get(id).clearOnDispatch();
    }

    handleAction(id: string, action: ActionsEnum) {
        this.gameStates.get(id).handleAction(action);
        this.callbackOnGameStateUpdate(id);
    }

    startGame() {
        this.updateGame();
    }

    private updateGame() {
        this.gameTimer = setTimeout(this.updateGame.bind(this), GAME_SPEED); // https://stackoverflow.com/a/5911280

        for (const [id, gameState] of this.gameStates.entries()) {
            console.log(id)
            if (!gameState.isGameOver) {
                this.handleAction(id, ActionsEnum.GO_DOWN);
            } else {
                clearTimeout(this.gameTimer);
            }
        }
    }
}




