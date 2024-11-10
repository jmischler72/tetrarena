import config from '@colyseus/tools';
import { playground } from '@colyseus/playground';
import basicAuth from 'express-basic-auth';
import { monitor } from '@colyseus/monitor';
import cors from 'cors';
import express from 'express';
import pino from 'pino';
import { LobbyRoom } from '@colyseus/core';
import { GameRoom } from './rooms/GameRoom';
import { GameModeEnum } from '@jmischler72/shared';
import { RankedLobbyRoom } from './rooms/RankedLobbyRoom';
import { RankedRoom } from './rooms/RankedRoom';
export default config({
	options: {
		// transport: new uWebSocketsTransport(),
		logger: pino({
			level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
		}),
		// driver: new RedisDriver(),
		// presence: new RedisPresence(),
	},
	initializeGameServer: (gameServer) => {
		// Expose the "lobby" room to send .
		gameServer.define('lobby', LobbyRoom);
		/**
		 * Define your room handlers:
		 */
		gameServer.define(GameModeEnum.First, GameRoom).enableRealtimeListing();
		gameServer.define(GameModeEnum.RankedLobby, RankedLobbyRoom);
		gameServer.define(GameModeEnum.Ranked, RankedRoom);
	},

	initializeExpress: (app) => {
		app.use(cors());
		app.use(express.json());

		app.get('/healthcheck', (req, res) => {
			res.status(200).json({ status: 'ok' });
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

		const basicAuthMiddleware = basicAuth({
			users: {
				admin: process.env.COLYSEUS_PASSWORD,
			},
			challenge: true,
		});
		app.use('/colyseus', basicAuthMiddleware, monitor());
	},

	beforeListen: () => {
		/**
		 * Before before gameServer.listen() is called.
		 */
	},
});
