import { Role } from '@/iam/login/enums/role.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity()
export class Users {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	username: string;

	@Column()
	role: Role;

	@Column({
		unique: true,
	})
	email: string;

	@Exclude()
	@Column({ length: 60 })
	password: string;

	toJSON() {
		return instanceToPlain(this);
	}
}
