import type { GameStateDTO } from '@jmischler72/core';

export type Player = {
  name: string;
  gameState?: GameStateDTO;
  connected: boolean;
};
