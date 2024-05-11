import { z } from 'zod';

export type FirstGameModeOptions = {
	goalScore: number;
};

export const zFirstGameModeOptions = z.object({
	goalScore: z.number().int().min(1).max(1000),
});
