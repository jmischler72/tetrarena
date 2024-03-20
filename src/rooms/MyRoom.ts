import {Client, Room, logger} from "@colyseus/core";
import {RoomState} from "./schema/RoomState";
import {Player} from "./schema/PlayerState";
import {ActionsEnum, GAME_SPEED} from "@jmischler72/core-tetris";
import {Delayed} from "colyseus";


export class MyRoom extends Room<RoomState> {
    maxClients = 2;
    private gameTimer!: Delayed;

    onCreate(options: any) {
        this.setState(new RoomState());
        this.setMetadata({
            roomName: options.roomName,
            roomIcon: options.roomIcon,
        });

        this.onMessage("action", (client, data: ActionsEnum) => {
            if (this.state.isPlaying) {
                logger.debug("handle action: " + data + " for client: " + client.sessionId)
                const player = this.state.players.get(client.sessionId);
                player.handleAction(data);
            }
        })

        this.clock.setTimeout(() => {
            if (this.clients.length < this.maxClients) {
                logger.info("timeout room: " + this.roomId);
                this.disconnect();
            }
        }, 50000);
    }

    onJoin(client: Client, options: any) {
        logger.info("client: " + client.sessionId + " joined room: " + this.roomId);
        this.state.players.set(client.sessionId, new Player());
        if (this.clients.length === this.maxClients) this.startGame();
    }

    onLeave(client: Client, consented: boolean) {
        logger.info("client: " + client.sessionId + " left room: " + this.roomId);
        // this.state.players.delete(client.sessionId);
    }

    onDispose() {
        logger.info("disposing room: " + this.roomId);
    }

    private startGame() {
        logger.info("starting game in room: " + this.roomId);

        this.state.isPlaying = true;

        // start the clock ticking
        this.clock.start();

        // Set an interval and store a reference to it
        // so that we may clear it later
        this.gameTimer = this.clock.setInterval(() => {
            logger.debug("Game Clock " + this.clock.elapsedTime);
            this.state.players.forEach(player => {
                player.handleAction(ActionsEnum.GO_DOWN)
                if (player.isGameOver) this.stopGame();
            });
        }, GAME_SPEED);
    }

    private stopGame() {
        logger.info("stopping game in room: " + this.roomId);

        this.gameTimer.clear();
        this.state.isPlaying = false;
    }

}
