import { GameMode } from './GameMode';
import { z } from 'zod';

export type RoomOptions = {
	name: string;
	icon: string;
	gameMode: GameMode;
};

export const zRoomOptions = z.object({
	name: z.string().min(4).max(20),
	icon: z.string().max(15),
	gameMode: z.any(),
});
