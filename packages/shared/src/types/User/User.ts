import { z } from 'zod';

export type User = {
	username: string;
};
export const zUser = z.object({
	username: z.string().min(4).max(20),
});
