import {ActionsEnum} from '../enums/actions.enum';
import {GAME_SPEED} from '../constants/game';
import {Player} from "../game/multiplayer/Player";
import {ActionDTO} from "../types/multiplayer/ActionDTO";

export class MultiPlayerInstance {
    private gameTimer: null | ReturnType<typeof setTimeout> = null;
    public readonly gameStates: Map<string, Player> = new Map<
        string,
        Player
    >();

    constructor(private ids: string[], private readonly callback: (id: string, actionDTO: ActionDTO) => void) {
        console.log('Game Started');

        ids.forEach((id) => {
            this.gameStates.set(id, new Player(id));
        })

        // ids.forEach((id) => {
        //     let player = this.getRandomOppIdForPlayer(id)
        //     if (player) this.gameStates.get(id)?.switchOpponent(player)
        // })
    }

    // private getRandomOppIdForPlayer(playerId: string) {
    //     let ids = this.ids.filter((id) => id !== playerId);
    //     let id = ids[Math.floor(Math.random() * ids.length)];
    //     return this.gameStates.get(id);
    // }

    startGame() {
        this.updateGame();
    }

    stopGame() {
        if (this.gameTimer) clearTimeout(this.gameTimer);
    }

    handleAction(id: string, action: ActionsEnum) {
        let gamestate = this.gameStates.get(id);
        if (!gamestate) {
            return
        }
        let hasActionBeenDone = this.gameStates.get(id)!.handleAction(action);

        if (hasActionBeenDone) this.callback(id, {action: action});
    }

    private updateGame() {
        this.gameTimer = setTimeout(this.updateGame.bind(this), GAME_SPEED); // https://stackoverflow.com/a/5911280

        for (const [id, gameState] of this.gameStates.entries()) {
            if (!gameState.isGameOver) {
                this.handleAction(id, ActionsEnum.GO_DOWN);
            } else {
                this.gameStates.delete(id);
                this.callback(id, {gameOver: true})
            }
        }
    }
}




