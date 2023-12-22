import {ActionsEnum} from "../../enums/actions.enum";
import {TetriminoPiece} from "../../constants/tetriminos";

export type GameEvent = {
    action: ActionsEnum;
    nextTetrimino?: TetriminoPiece;
};