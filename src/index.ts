import express from "express";
import {createServer} from "http";
import {Server} from "colyseus";
import {MyRoom} from "./rooms/MyRoom";
import {playground} from "@colyseus/playground";
import {monitor} from "@colyseus/monitor";
import pino from "pino";
import basicAuth from "express-basic-auth";
import {logger} from "@colyseus/core";
import {WebSocketTransport} from "@colyseus/ws-transport";

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

const server = createServer(app); // create the http server manually

const gameServer = new Server({
    logger: pino({
        level: 'debug',
    }),
    transport: new WebSocketTransport({
        server // provide the custom server for `WebSocketTransport`
    })
    // driver: new RedisDriver(),
    // presence: new RedisPresence(),
});

/**
 * Define your room handlers:
 */
gameServer.define("my_room", MyRoom);

const port = Number(process.env.PORT) || 8080;
gameServer.listen(port).then(() => {
    logger.info("Server is listening on port: " + port);
});