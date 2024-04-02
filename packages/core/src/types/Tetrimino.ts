import {ColorEnum} from "enums/color.enum";

export interface Tetrimino {
    position_x: number;
    position_y: number;
    rotation: number;
    color: ColorEnum;
}
