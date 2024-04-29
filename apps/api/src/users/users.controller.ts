import {
	Controller,
	Put,
	Get,
	Body,
	Param,
	HttpStatus,
	NotFoundException,
	Delete,
	BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccountsUsers } from './interfaces/accounts-users.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../iam/login/decorators/auth-guard.decorator';
import { AuthType } from '../iam/login/enums/auth-type.enum';
import { User } from '@/iam/login/decorators/user.decorator';

@ApiTags('users')
@AuthGuard(AuthType.Bearer)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	public async getCurrentUser(@User('email') email: string): Promise<AccountsUsers> {
		return this.usersService.findByEmail(email);
	}

	// @Get('/:userId')
	// public async findOneUser(@Param('userId') userId: string): Promise<AccountsUsers> {
	// 	return this.usersService.findById(userId);
	// }

	// @Get('/:userId/profile')
	// public async getUser(@Param('userId') userId: string): Promise<any> {
	// 	const user = await this.findOneUser(userId);

	// 	if (!user) {
	// 		throw new NotFoundException('User does not exist!');
	// 	}

	// 	return {
	// 		user: user,
	// 		status: HttpStatus.OK,
	// 	};
	// }

	// @Put('/:userId/profile')
	// public async updateUserProfile(
	// 	@Param('userId') userId: string,
	// 	@Body() userProfileDto: UserProfileDto,
	// ): Promise<any> {
	// 	try {
	// 		await this.usersService.updateUserProfile(userId, userProfileDto);

	// 		return {
	// 			message: 'User Updated successfully!',
	// 			status: HttpStatus.OK,
	// 		};
	// 	} catch (err) {
	// 		throw new BadRequestException(err, 'Error: User not updated!');
	// 	}
	// }

	// @Put('/:userId')
	// public async updateUser(@Param('userId') userId: string, @Body() userUpdateDto: UserUpdateDto): Promise<any> {
	// 	try {
	// 		await this.usersService.updateUser(userId, userUpdateDto);

	// 		return {
	// 			message: 'User Updated successfully!',
	// 			status: HttpStatus.OK,
	// 		};
	// 	} catch (err) {
	// 		throw new BadRequestException(err, 'Error: User not updated!');
	// 	}
	// }

	// @Delete('/:userId')
	// public async deleteUser(@Param('userId') userId: string): Promise<void> {
	// 	await this.usersService.deleteUser(userId);
	// }
}
