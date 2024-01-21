import {Room, Client} from "@colyseus/core";
import {MyRoomState, Player} from "./schema/MyRoomState";


export class MyRoom extends Room<MyRoomState> {
    maxClients = 4;

    onCreate(options: any) {
        this.setState(new MyRoomState());

        this.onMessage("move", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            console.log(data.x);

            player.x += data.x;
            // player.y += data.y;
            console.log(client.sessionId + " at, x: " + player.x, "y: " + player.y);
        });
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        this.state.players.set(client.sessionId, new Player());
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}
