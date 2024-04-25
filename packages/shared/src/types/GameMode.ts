import { GameOptions } from './GameOptions';
import { FirstGameModeOptions } from './FirstGameModeOptions';

export type GameMode = {
  name: string;
  description?: string;
  options: GameOptions;
};

export const gameModes: GameMode[] = [
  {
    name: 'First',
    description: 'Be the first to reach the goal score',
    options: {
      goalScore: 100,
    } as FirstGameModeOptions,
  },
];
