import express from "express";
import {createServer} from "http";
import {Server} from "colyseus";
import {MyRoom} from "./rooms/MyRoom";
import {playground} from "@colyseus/playground";
import {monitor} from "@colyseus/monitor";
import pino from "pino";
import basicAuth from "express-basic-auth";

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

const basicAuthMiddleware = basicAuth({
    // list of users and passwords
    users: {
        "admin": "balisto48",
    },
    // sends WWW-Authenticate header, which will prompt the user to fill
    // credentials in
    challenge: true
});
app.use("/colyseus", basicAuthMiddleware, monitor());


const gameServer = new Server({
    server: createServer(app),
    logger: pino({
        level: 'debug',
        msgPrefix: '[HTTP] '
    })
    // transport: new uWebSocketsTransport(),
    // driver: new RedisDriver(),
    // presence: new RedisPresence(),
});

/**
 * Define your room handlers:
 */
gameServer.define("my_room", MyRoom);

gameServer.listen(process.env.PORT);