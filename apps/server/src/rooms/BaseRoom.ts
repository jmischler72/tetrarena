import { Client, Room } from '@colyseus/core';
import { PlayerState, RoomOptions, RoomState } from '@jmischler72/shared';
import { Delayed } from 'colyseus';
import { MessageTypeEnum } from '@jmischler72/shared';
import { checkIfAllPlayersAreReady } from './utils';
import pino, { Logger } from 'pino';
import { ActionsEnum } from '@jmischler72/core';

const TIMEOUT = 50000;

export class BaseRoom<V extends RoomState> extends Room<V> {
  maxClients = 2;
  private timeout: Delayed;
  logger: Logger = pino({ level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info' });

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
    this.logger.debug(this.state.admin);

    const newPlayer = new PlayerState();
    this.state.players.set(client.sessionId, newPlayer);
  }

  async onLeave(client: Client, consented: boolean) {
    const isAdmin = client.sessionId === this.state.admin;
    if (isAdmin) this.state.admin = this.clients.find((c) => c.sessionId !== client.sessionId)?.sessionId || '';
    this.state.players.get(client.sessionId).connected = false;

    this.initializeTimeout();

    if (consented) {
      this.state.players.delete(client.sessionId);
      if (this.state.isPlaying) this.stopGame();
      this.logger.info('client: ' + client.sessionId + ' left room consented');
      return;
    }
    try {
      await this.allowReconnection(client, 20);

      this.logger.info('client: ' + client.sessionId + ' rejoined room');
      if (isAdmin) this.state.admin = client.sessionId;
      this.state.players.get(client.sessionId).connected = true;
    } catch (e) {
      this.state.players.delete(client.sessionId);
      if (this.state.isPlaying) this.stopGame();
      this.logger.info('client: ' + client.sessionId + ' left room');
    }
  }

  onDispose() {
    this.logger.info('disposing room');
  }

  protected setRoomMetadata(options: RoomOptions) {
    void this.setMetadata({
      name: options.name,
      icon: options.icon,
      gameMode: options.gameMode,
    });

    this.state.name = options.name;
    this.state.icon = options.icon;
    this.state.gameMode = options.gameMode.name;
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
    this.onMessage(MessageTypeEnum.PLAYER_ACTION, (client, data: ActionsEnum) => {
      if (this.state.isPlaying) {
        this.logger.debug('handle action: ' + data + ' for client: ' + client.sessionId);
        const player = this.state.players.get(client.sessionId);
        if (player) player.handleAction(data);
      }
    });

    this.onMessage(MessageTypeEnum.EDIT_ROOM, (client, data: RoomOptions) => {
      if (client.sessionId === this.state.admin) {
        this.logger.debug('client: ' + client.sessionId + 'changed metadata in room');
        this.setRoomMetadata(data);
      }
    });
  }

  private initializeTimeout() {
    if (this.timeout) this.timeout.clear();
    this.timeout = this.clock.setTimeout(() => {
      if (this.clients.length < this.maxClients) {
        this.logger.info('timeout room');
        this.broadcast(MessageTypeEnum.TIMEOUT);
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
  }
}