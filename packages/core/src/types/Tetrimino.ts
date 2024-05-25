import { ColorEnum } from 'enums/color.enum';

export interface Tetrimino {
	id: string;
	position_x: number;
	position_y: number;
	rotation: number;
	color: ColorEnum;
}
