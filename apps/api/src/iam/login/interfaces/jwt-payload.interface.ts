import { Role } from '../enums/role.enum';

export interface JWTPayload {
	id: number;
	email: string;
	role: Role;
	name: string;
}
