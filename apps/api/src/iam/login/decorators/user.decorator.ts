import { REQUEST_USER_KEY } from '@/iam/iam.constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest();
	// if route is protected, there is a user set in auth.middleware
	if (!!req[REQUEST_USER_KEY]) {
		return !!data ? req[REQUEST_USER_KEY][data] : req[REQUEST_USER_KEY];
	}
});
