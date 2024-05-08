import { z } from 'zod';
import { GameOptions, zGameOptions } from './GameOptions';
import { GameModeEnum } from './GameModeEnum';

export type RoomOptions = {
	name: string;
	icon: string;
	gameMode: GameModeEnum;
	gameOptions: GameOptions;
};

export const zRoomOptions = z.object({
	name: z.string().min(4).max(20),
	icon: z.string().max(15),
	gameMode: z.nativeEnum(GameModeEnum),
	gameOptions: zGameOptions,
});
