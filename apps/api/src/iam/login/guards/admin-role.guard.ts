import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { REQUEST_USER_KEY } from '@/iam/iam.constants';

@Injectable()
export class AdminRoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		if (!request[REQUEST_USER_KEY])
			throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, 'Authentication failed. Wrong password');

		if (Role.Admin === request[REQUEST_USER_KEY].role) {
			Logger.log(request[REQUEST_USER_KEY]);
			return true;
		}
		return false;
	}
}
