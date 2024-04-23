import { Client, Room, logger } from '@colyseus/core';
import { PlayerState, RoomOptions, RoomState } from '@jmischler72/shared';
import { ActionsEnum, GAME_SPEED } from '@jmischler72/core';
import { Delayed } from 'colyseus';
import { MessageTypeEnum } from '@jmischler72/shared';
import { checkIfAllPlayersAreReady } from './utils';

const TIMEOUT = 50000;
export class MyRoom extends Room<RoomState> {
  maxClients = 2;
  private gameTimer: Delayed;
  private timeout: Delayed;

  onCreate(options: RoomOptions) {
    logger.info('created room: ' + this.roomId);
    logger.debug(options);
    this.clock.start();

    this.setPatchRate(16.6);

    this.setState(new RoomState(options.name, options.icon, options.gameMode.mode));

    void this.setMetadata({
      name: options.name,
      icon: options.icon,
      gameMode: options.gameMode,
    });

    this.initializeTimeout();
    this.handleMessages();
  }

  onJoin(client: Client) {
    logger.info('client: ' + client.sessionId + ' joined room: ' + this.roomId);
    if (this.clients.length === 1) this.state.admin = client.sessionId;
    logger.debug(this.state.admin);

    const newPlayer = new PlayerState();
    this.state.players.set(client.sessionId, newPlayer);
  }

  async onLeave(client: Client, consented: boolean) {
    logger.info('client: ' + client.sessionId + ' left room: ' + this.roomId);
    if (client.sessionId === this.state.admin) this.state.admin = this.clients.find((c) => c.sessionId !== client.sessionId).sessionId;
    this.state.players.get(client.sessionId).connected = false;

    this.initializeTimeout();

    if (consented) {
      this.state.players.delete(client.sessionId);
      if (this.state.isPlaying) this.stopGame();
      logger.info('client: ' + client.sessionId + ' left room consented: ' + this.roomId);
      return;
    }

    try {
      await this.allowReconnection(client, 20);

      logger.info('client: ' + client.sessionId + ' rejoined room: ' + this.roomId);
      this.state.players.get(client.sessionId).connected = true;
    } catch (e) {
      this.state.players.delete(client.sessionId);
      if (this.state.isPlaying) this.stopGame();
      logger.info('client: ' + client.sessionId + ' left room: ' + this.roomId);
    }
  }

  onDispose() {
    logger.info('disposing room: ' + this.roomId);
  }

  private handleMessages() {
    this.onMessage(MessageTypeEnum.READY, (client) => {
      logger.debug('client ready: ' + client.sessionId);
      const player = this.state.players.get(client.sessionId);
      player.ready = true;
      this.startGame();
    });

    this.onMessage(MessageTypeEnum.PING, (client) => {
      logger.debug('received ping request: ' + client.sessionId);
      client.send(MessageTypeEnum.PONG, { time: Date.now() });
    });

    this.onMessage(MessageTypeEnum.PLAYER_ACTION, (client, data: ActionsEnum) => {
      if (this.state.isPlaying) {
        logger.debug('handle action: ' + data + ' for client: ' + client.sessionId);
        const player = this.state.players.get(client.sessionId);
        if (player) player.handleAction(data);
      }
    });
  }

  private initializeTimeout() {
    if (this.timeout) this.timeout.clear();
    this.timeout = this.clock.setTimeout(() => {
      if (this.clients.length < this.maxClients) {
        logger.info('timeout room: ' + this.roomId);
        this.broadcast(MessageTypeEnum.TIMEOUT);
        void this.disconnect();
      }
    }, TIMEOUT);
  }

  private startGame() {
    if (this.state.isPlaying) return;
    if (this.clients.length < this.maxClients) {
      logger.debug('cant start game in room ' + this.roomId + ': not enough players');
      return;
    }
    if (!checkIfAllPlayersAreReady(this.state)) {
      logger.debug('cant start game in room ' + this.roomId + ': not all players are ready');
      return;
    }

    const seed = Date.now();
    this.state.players.forEach((player) => {
      player.ready = false;
      player.createGame(seed);
    });

    logger.info('starting game in room: ' + this.roomId);

    this.state.isPlaying = true;

    this.gameTimer = this.clock.setInterval(() => {
      this.state.players.forEach((player) => {
        player.handleAction(ActionsEnum.GO_DOWN);
        if (player.gameState.isGameOver || player.gameState.score >= 100) this.stopGame();
      });
    }, GAME_SPEED);
  }

  private stopGame() {
    logger.info('stopping game in room: ' + this.roomId);

    if (this.gameTimer) this.gameTimer.clear();
    this.state.isPlaying = false;

    this.state.players.forEach((player, key) => {
      if (!player.gameState.isGameOver) this.state.winner = key;
    });
    logger.info('winner in room: ' + this.state.winner);
  }
}
