import config from '@colyseus/tools';
import { MyRoom } from './rooms/MyRoom';
import { playground } from '@colyseus/playground';
import basicAuth from 'express-basic-auth';
import { monitor } from '@colyseus/monitor';
import pkg from '../../../package.json';
import cors from 'cors';
import express from 'express';
import pino from 'pino';

export default config({
  options: {
    logger: pino({
      level: 'debug',
    }),
    // transport: new uWebSocketsTransport(),
    // driver: new RedisDriver(),
    // presence: new RedisPresence(),
  },
  initializeGameServer: (gameServer) => {
    /**
     * Define your room handlers:
     */
    gameServer.define('my_room', MyRoom);
  },

  initializeExpress: (app) => {
    app.use(cors());
    app.use(express.json());
    /**
     * Get version of the server
     */
    app.get('/version', (req, res) => {
      res.status(200).json({ version: pkg.version });
    });

    /**
     * Use @colyseus/playground
     * (It is not recommended to expose this route in a production environment)
     */
    if (process.env.NODE_ENV !== 'production') {
      app.use('/', playground);
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */

    if (process.env.NODE_ENV !== 'production') {
      app.use('/colyseus', monitor());
    } else {
      const basicAuthMiddleware = basicAuth({
        users: {
          admin: 'balisto48',
        },
        challenge: true,
      });
      app.use('/colyseus', basicAuthMiddleware, monitor());
    }
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  },
});
