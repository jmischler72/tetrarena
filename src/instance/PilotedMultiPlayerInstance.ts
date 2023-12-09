import {Player} from "../game/multiplayer/Player";
import {ActionsEnum} from "../enums/actions.enum";

export class PilotedMultiPlayerInstance {
    public readonly gameStates: Map<string, Player> = new Map<
        string,
        Player
    >();

    constructor(private players: string[]) {
        console.log('Game Started');

        players.forEach((id) => {
            this.gameStates.set(id, new Player(id));
        })
    }

    // syncGameState(clientId: string, gameState: SyncGameStateDTO) {
    //     this.gameStates.get(clientId)?.setGameState(gameState);
    // }



    handleAction(id: string, action: ActionsEnum) {
        this.gameStates.get(id)?.handleAction(action);
    }
}




