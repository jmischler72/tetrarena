import { GameOptions } from './GameOptions';
import { FirstGameModeOptions } from './FirstGameModeOptions';
import { GameModeEnum } from './GameModeEnum';

type GameMode = {
	mode: GameModeEnum;
	name: string;
	description: string;
	options: GameOptions;
};

export const defaultGameModes: GameMode[] = [
	{
		mode: GameModeEnum.First,
		name: 'First',
		description: 'Be the first to reach the goal score',
		options: {
			goalScore: 20,
			opponentAttacking: false,
		} as FirstGameModeOptions,
	},
];

export function getDefaultGameMode(mode: GameModeEnum): GameMode {
	return defaultGameModes.find((gm) => gm.mode === mode)!;
}
