import express from "express";
import { createServer } from "http";
import { Server } from "colyseus";
import { MyRoom } from "./rooms/MyRoom";
import {playground} from "@colyseus/playground";
import {monitor} from "@colyseus/monitor";

const app = express();
app.use(express.json());


/**
 * Use @colyseus/playground
 * (It is not recommended to expose this route in a production environment)
 */
if (process.env.NODE_ENV !== "production") {
    app.use("/", playground);
}

/**
 * Use @colyseus/monitor
 * It is recommended to protect this route with a password
 * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
 */
app.use("/colyseus", monitor());


const gameServer = new Server({
    server: createServer(app),
    // transport: new uWebSocketsTransport(),
    // driver: new RedisDriver(),
    // presence: new RedisPresence(),
});

/**
 * Define your room handlers:
 */
gameServer.define("my_room", MyRoom);

gameServer.listen(2567);