import { GameModeEnum } from '../enums/GameModeEnum';
import { GameModeOptions } from './GameModeOptions';
import { FirstGameModeOptions } from './FirstGameModeOptions';

export type GameMode = {
  name: string;
  mode: GameModeEnum;
  description: string;
  options: GameModeOptions;
};

export const gameModes: GameMode[] = [
  {
    name: 'First',
    mode: GameModeEnum.FIRST,
    description: 'Be the first to reach the goal score',
    options: {
      goalScore: 100,
    } as FirstGameModeOptions,
  },
];

export const getGameModeFromEnum = (mode: GameModeEnum) => gameModes.find((m) => (m.mode = mode)) || gameModes[0];
