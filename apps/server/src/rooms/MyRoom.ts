import { Client, Room, logger } from '@colyseus/core';
import { RoomState } from '@jmischler72/shared';
import { Player } from '@jmischler72/shared';
import { ActionsEnum, GAME_SPEED } from '@jmischler72/core';
import { Delayed } from 'colyseus';
import { MessageTypeEnum } from '@jmischler72/shared';

export class MyRoom extends Room<RoomState> {
  maxClients = 2;
  private gameTimer!: Delayed;
  private createdAt: number = Date.now();
  private gameMode: string;

  onCreate(options: any) {
    logger.info('created room: ' + this.roomId);
    logger.debug(options);

    this.setState(new RoomState());
    this.gameMode = options.gameMode;

    void this.setMetadata({
      name: options.name,
      icon: options.icon,
      createdAt: this.createdAt,
      gameMode: this.gameMode,
    });

    this.onMessage(MessageTypeEnum.PING, (client) => {
      // console.log(client.sessionId, "sent ping request ");
      client.send('pong', { time: Date.now() });
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

    this.clock.setTimeout(() => {
      if (this.clients.length < this.maxClients) {
        logger.info('timeout room: ' + this.roomId);
        this.disconnect().then((r) => {
          logger.debug(r);
        });
      }
    }, 50000);
  }

  onJoin(client: Client, options: any) {
    logger.info('client: ' + client.sessionId + ' joined room: ' + this.roomId);
    this.state.players.set(client.sessionId, new Player(this.createdAt));
    if (this.clients.length === this.maxClients) this.startGame();
  }

  onLeave(client: Client, consented: boolean) {
    logger.info('client: ' + client.sessionId + ' left room: ' + this.roomId);
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    logger.info('disposing room: ' + this.roomId);
  }

  private startGame() {
    logger.info('starting game in room: ' + this.roomId);
    if (this.state.isPlaying) return;

    this.state.isPlaying = true;

    // start the clock ticking
    this.clock.start();

    // Set an interval and store a reference to it
    // so that we may clear it later
    this.gameTimer = this.clock.setInterval(() => {
      this.state.players.forEach((player) => {
        player.handleAction(ActionsEnum.GO_DOWN);
        if (player.isGameOver) this.stopGame();
      });
    }, GAME_SPEED);
  }

  private stopGame() {
    logger.info('stopping game in room: ' + this.roomId);

    this.gameTimer.clear();
    this.state.isPlaying = false;

    const newSeed = Date.now();
    this.state.players.forEach((player, key) => {
      player.recreateGameInstance(newSeed);
      if (!player.isGameOver) this.state.winner = key;
    });
  }
}