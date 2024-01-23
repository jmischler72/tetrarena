import {Client, Room} from "@colyseus/core";
import {RoomState} from "./schema/RoomState";
import {Player} from "./schema/PlayerState";
import {ActionsEnum} from "@jmischler72/core-tetris";


export class MyRoom extends Room<RoomState> {
    maxClients = 4;

    onCreate(options: any) {
        this.setState(new RoomState());

        this.onMessage("down", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            player.game.updateGameState(ActionsEnum.GO_DOWN);

            this.updatePlayer(client);
        })

        // this.onMessage("move", (client, data) => {
        //     const player = this.state.players.get(client.sessionId);
        //     console.log(data.x);
        //
        //     player.x += data.x;
        //     // player.y += data.y;
        //     console.log(client.sessionId + " at, x: " + player.x, "y: " + player.y);
        // });
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        this.state.players.set(client.sessionId, new Player());
        this.updatePlayer(client);
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
        this.state.players.delete(client.sessionId);
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

    updatePlayer(client: Client) {
        const player = this.state.players.get(client.sessionId);
        player.updateFromGameStateDTO(player.game.getCurrentGameState());
    }

}
