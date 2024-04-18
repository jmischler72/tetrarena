import GameScene from './GameScene';
import BoardContainer from '../components/BoardContainer/BoardContainer';
import * as TWEEN from '@tweenjs/tween.js';
import { get } from 'svelte/store';

import type { IScene } from '../Manager';
import { playersStore, roomStore } from '$lib/stores/multiplayerStore';
import type { Player } from '$lib/functions/Player';

export default class MultiPlayerGameScene extends GameScene implements IScene {
  private readonly playerBoard: BoardContainer;
  private readonly oppBoard: BoardContainer;

  constructor() {
    super();

    this.playerBoard = new BoardContainer(get(playersStore).get(get(roomStore).sessionId));
    this.oppBoard = new BoardContainer(get(playersStore));
    this.oppBoard.position.set(this.playerBoard.x + this.playerBoard.width, this.playerBoard.y);
    this.addChild(this.playerBoard, this.oppBoard);

    this.playerBoard.renderPlayerBorder();
  }

  update(): void {
    this.stats.begin();
    TWEEN.update();

    get(playersStore).forEach((value: Player, key: string) => {
      const boardToUpdate = key === get(roomStore)?.sessionId ? this.playerBoard : this.oppBoard;
      if (value.gameState !== undefined) boardToUpdate.updatePlayerBoard(value.gameState, value.name + ': ' + value.connected);
    });

    this.stats.end();
  }

  resize(screenWidth: number, screenHeight: number): void {
    const GAMES_CONTAINER_GAP = 60;

    this.playerBoard.position.set(
      screenWidth / 2 - this.playerBoard.width / 2 - this.oppBoard.width / 2 - GAMES_CONTAINER_GAP,
      screenHeight / 2 - this.playerBoard.height / 2,
    );

    this.oppBoard.position.set(
      screenWidth / 2 - this.oppBoard.width / 2 + this.playerBoard.width / 2 + GAMES_CONTAINER_GAP,
      screenHeight / 2 - this.oppBoard.height / 2,
    );
  }
}
