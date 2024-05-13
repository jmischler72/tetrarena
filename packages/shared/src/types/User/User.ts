import { z } from 'zod';

export type UserInfos = {
	username: string;
};
export const zUserInfos = z.object({
	username: z.string().min(4).max(20),
});
