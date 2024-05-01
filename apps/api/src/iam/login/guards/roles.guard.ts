import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access-token.guard';
import { ROLES_KEY } from '../decorators/role-guard.decorator';
import { Role } from '../enums/role.enum';
import { REQUEST_USER_KEY } from '@/iam/iam.constants';
import { AdminRoleGuard } from './admin-role.guard';

@Injectable()
export class RoleGuard implements CanActivate {
	private static readonly defaultRole = Role.User;
	private readonly roleGuardMap: Record<Role, CanActivate | CanActivate[]> = {
		[Role.Admin]: this.adminRoleGuard,
		[Role.User]: { canActivate: () => true },
	};
	constructor(
		private readonly reflector: Reflector,
		private readonly adminRoleGuard: AdminRoleGuard,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]) ?? [
			RoleGuard.defaultRole,
		];
		const guards = roles.map((type) => this.roleGuardMap[type]).flat();
		let error = new UnauthorizedException();

		for (const instance of guards) {
			const canActivate = await Promise.resolve(instance.canActivate(context)).catch((err) => {
				error = err;
			});

			if (canActivate) {
				return true;
			}
		}
		throw error;
	}
}
