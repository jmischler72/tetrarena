import { Client, Room, logger } from '@colyseus/core';
import { PlayerState, RoomOptions, RoomState, zRoomOptions } from '@jmischler72/shared';
import { Delayed } from 'colyseus';
import { MessageTypeEnum } from '@jmischler72/shared';
import { checkIfAllPlayersAreReady } from '../utils/utils';
import pino, { Logger } from 'pino';
import { getAuth } from 'firebase-admin/auth';
import { app } from '../utils/firebase/FirebaseAdmin';
import { FirebaseService } from '../utils/firebase/FirebaseService';
import { ActionsEnum } from '@jmischler72/core';

const TIMEOUT = 50000;

export class BaseRoom<V extends RoomState> extends Room<V> {
	maxClients = 2;
	private timeout: Delayed;
	logger: Logger = pino({ level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info' });

	static onAuth(token: string, req: any) {
		return getAuth(app)
			.verifyIdToken(token)
			.then((decodedToken) => {
				return FirebaseService.checkIfUserNotInRoom(decodedToken.uid).then((notInRoom) => {
					if (notInRoom) {
						logger.info('User not in room');
						return decodedToken;
					}
					throw new Error('User already in room');
				});
			});
	}

	onCreate(options: RoomOptions) {
		this.logger = this.logger.child({ RoomId: this.roomId });
		this.logger.info('created room');

		this.logger.debug(options);
		this.clock.start();

		this.setPatchRate(16.6);

		this.setRoomMetadata(options);

		this.initializeTimeout();
		this.handleMessages();
	}

	onJoin(client: Client) {
		this.logger.info('client: ' + client.sessionId + ' joined room');
		if (this.clients.length <= 1) this.state.admin = client.sessionId;
		this.initializeTimeout();

		FirebaseService.setUserInRoom(client.auth.uid, this.roomId);
		FirebaseService.getUsername(client.auth.uid).then((username) => {
			this.state.players.set(client.sessionId, new PlayerState(client.auth.uid, username));
		});
	}

	async onLeave(client: Client, consented: boolean) {
		const isAdmin = client.sessionId === this.state.admin;
		if (isAdmin) this.state.admin = this.clients.find((c) => c.sessionId !== client.sessionId)?.sessionId || '';
		this.state.players.get(client.sessionId).connected = false;

		if (consented) {
			this.handlePlayerDisconnect(client.sessionId, true);
			return;
		}

		try {
			await this.allowReconnection(client, 20);

			this.logger.info('client: ' + client.sessionId + ' rejoined room');
			if (isAdmin) this.state.admin = client.sessionId;
			this.state.players.get(client.sessionId).connected = true;
		} catch (e) {
			this.handlePlayerDisconnect(client.sessionId, false);
		}
	}

	private handlePlayerDisconnect(clientId: string, consented: boolean) {
		FirebaseService.setUserInRoom(this.state.players.get(clientId).userId, null);
		this.state.players.delete(clientId);
		if (this.state.isPlaying) this.stopGame();
		this.logger.info('client: ' + clientId + ' left room' + (consented ? ' consented' : ''));
	}

	onDispose() {
		this.logger.info('disposing room');
	}

	protected setRoomMetadata(options: RoomOptions) {
		zRoomOptions.parse(options);
		void this.setMetadata({
			name: options.name,
			icon: options.icon,
			gameMode: options.gameMode,
		});

		this.state.name = options.name;
		this.state.icon = options.icon;
		this.state.gameMode = options.gameMode;
	}

	private handleMessages() {
		this.onMessage(MessageTypeEnum.READY, (client) => {
			this.logger.debug('client ready: ' + client.sessionId);
			const player = this.state.players.get(client.sessionId);
			player.ready = true;
			this.startGame();
		});

		this.onMessage(MessageTypeEnum.PING, (client) => {
			this.logger.debug('received ping request: ' + client.sessionId);
			client.send(MessageTypeEnum.PONG, { time: Date.now() });
		});
		this.onMessage(MessageTypeEnum.PLAYER_ACTION, (client, data) => {
			this.logger.debug('handle action: ' + data + ' for client: ' + client.sessionId);
			const player = this.state.players.get(client.sessionId);
			if (player) this.handlePlayerInput(player, data);
		});

		this.onMessage(MessageTypeEnum.EDIT_ROOM, (client, data: RoomOptions) => {
			if (client.sessionId === this.state.admin) {
				this.logger.debug('client: ' + client.sessionId + 'changed metadata in room');
				this.setRoomMetadata(data);
			}
		});

		this.onMessage(MessageTypeEnum.RESET_TIMEOUT, () => {
			this.initializeTimeout();
		});
	}

	private initializeTimeout() {
		this.broadcast(MessageTypeEnum.TIMEOUT);

		if (this.timeout) this.timeout.clear();
		this.timeout = this.clock.setTimeout(() => {
			if (!this.state.isPlaying) {
				this.logger.info('timeout room');
				void this.disconnect();
			}
		}, TIMEOUT);
	}

	protected startGame() {
		if (this.state.isPlaying) return;
		if (this.clients.length < this.maxClients) {
			this.logger.debug('cant start game in room: not enough players');
			return;
		}
		if (!checkIfAllPlayersAreReady(this.state)) {
			this.logger.debug('cant start game in room: not all players are ready');
			return;
		}

		this.logger.info('starting game');

		this.state.isPlaying = true;
	}

	protected stopGame() {
		this.logger.info('stopping game');

		this.state.isPlaying = false;
		this.initializeTimeout();
	}

	protected handlePlayerInput(player: PlayerState, data: ActionsEnum) {
		if (!this.state.isPlaying) return;

		player.handleAction(data);
	}
}
