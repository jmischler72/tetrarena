import { Role } from '@/iam/login/enums/role.enum';
import { MaxLength, IsNotEmpty, IsEmail, IsString, IsEnum } from 'class-validator';

export class UserDto {
	@IsString()
	@MaxLength(30)
	readonly name: string;

	@IsString()
	@MaxLength(40)
	readonly username: string;

	@IsEnum(Role)
	readonly role: Role = Role.User;

	@IsEmail()
	@IsString()
	@IsNotEmpty()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(60)
	password: string;
}
