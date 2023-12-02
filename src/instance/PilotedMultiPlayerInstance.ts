import {ActionsEnum} from '../enums/actions.enum';
import {GameStateDTO} from "../types/GameStateDTO";
import {Player} from "../game/multiplayer/Player";
import {SyncGameStateDTO} from "../types/multiplayer/SyncGameStateDTO";

export class PilotedMultiPlayerInstance {
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

    syncGameState(clientId: string, gameState: SyncGameStateDTO){
        this.gameStates.get(clientId).setGameState(gameState);
    }

    handleAction(id: string, action: ActionsEnum) {
        this.gameStates.get(id).handleAction(action);
        this.callbackOnGameStateUpdate(id);
    }

    private callbackOnGameStateUpdate(id: string) {
        this.callback(id, this.gameStates.get(id).getCurrentGameState());
        this.gameStates.get(id).clearOnDispatch();
    }
}




