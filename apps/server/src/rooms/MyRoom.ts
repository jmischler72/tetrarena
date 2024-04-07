import { Client, Room, logger } from '@colyseus/core';
import { PlayerState, RoomState } from '@jmischler72/types';
import { ActionsEnum, GAME_SPEED } from '@jmischler72/core';
import { Delayed } from 'colyseus';
import { MessageTypeEnum } from '@jmischler72/types';

const TIMEOUT = 50000;
export class MyRoom extends Room<RoomState> {
  maxClients = 2;
  private gameTimer: Delayed;
  private createdAt: number = Date.now();
  private gameMode: string;
  private timeout: Delayed = this.initializeTimeout();

  onCreate(options: any) {
    logger.info('created room: ' + this.roomId);
    logger.debug(options);
    this.clock.start();

    this.setState(new RoomState());

    void this.setMetadata({
      name: options.name,
      icon: options.icon,
      createdAt: this.createdAt,
      gameMode: options.gameMode,
    });

    this.handleMessages();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onJoin(client: Client, options: any) {
    logger.info('client: ' + client.sessionId + ' joined room: ' + this.roomId);

    const newPlayer = new PlayerState();
    newPlayer.createGame(this.createdAt);
    this.state.players.set(client.sessionId, newPlayer);

    this.startGame();
  }

  async onLeave(client: Client, consented: boolean) {
    logger.info('client: ' + client.sessionId + ' left room: ' + this.roomId);
    this.state.players.get(client.sessionId).connected = false;

    this.timeout = this.initializeTimeout();

    if (consented) {
      this.state.players.delete(client.sessionId);
      this.stopGame();
      logger.info('client: ' + client.sessionId + ' left room consented: ' + this.roomId);
      return;
    }

    try {
      // allow disconnected client to reconnect into this room until 20 seconds
      await this.allowReconnection(client, 20);

      // client returned! let's re-activate it.
      this.state.players.get(client.sessionId).connected = true;
    } catch (e) {
      // 20 seconds expired. let's remove the client.
      this.state.players.delete(client.sessionId);
      this.stopGame();
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
      // console.log(client.sessionId, "sent ping request ");
      client.send(MessageTypeEnum.PONG, { time: Date.now() });
    });

    this.onMessage(MessageTypeEnum.GAME_RESTART, (client) => {
      logger.debug('received game restart request from client: ' + client.sessionId);
      // console.log(client.sessionId, "sent ping request ");
      // client.send("pong", {time: Date.now()});
      this.startGame();
    });

    this.onMessage(MessageTypeEnum.PLAYER_ACTION, (client, data: ActionsEnum) => {
      if (this.state.isPlaying) {
        logger.debug('handle action: ' + data + ' for client: ' + client.sessionId);
        const player = this.state.players.get(client.sessionId);
        player.handleAction(data);
      }
    });
  }

  private initializeTimeout() {
    return this.clock.setTimeout(() => {
      if (this.clients.length < this.maxClients && !this.state.isPlaying) {
        logger.info('timeout room: ' + this.roomId);
        void this.disconnect();
      }
    }, TIMEOUT);
  }

  private checkIfAllPlayersAreReady() {
    let allPlayersReady = true;
    this.state.players.forEach((player) => {
      if (player.ready === false) {
        allPlayersReady = false;
        return;
      }
    });
    return allPlayersReady;
  }

  private startGame() {
    if (this.state.isPlaying) return;
    if (this.clients.length < this.maxClients) {
      logger.debug('cant start game in room ' + this.roomId + ': not enough players');
      return;
    }
    if (!this.checkIfAllPlayersAreReady()) {
      logger.debug('cant start game in room ' + this.roomId + ': not all players are ready');
      return;
    }

    logger.info('starting game in room: ' + this.roomId);

    this.state.isPlaying = true;

    this.gameTimer = this.clock.setInterval(() => {
      this.state.players.forEach((player) => {
        player.handleAction(ActionsEnum.GO_DOWN);
        if (player.gameState.isGameOver) this.stopGame();
      });
    }, GAME_SPEED);
  }

  private stopGame() {
    logger.info('stopping game in room: ' + this.roomId);

    if (this.gameTimer) this.gameTimer.clear();
    this.state.isPlaying = false;

    const newSeed = Date.now();
    this.state.players.forEach((player, key) => {
      player.createGame(newSeed);
      if (!player.gameState.isGameOver) this.state.winner = key;
    });
  }
}
