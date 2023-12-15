import {ColorEnum} from "../../enums/color.enum";
import {Game} from "../Game";
import {InitPlayerDTO} from "../../types/multiplayer/InitPlayerDTO";
import {getNewTetriminoFromTetriminoPiece} from "../../utils/tetriminoHelper";

export class PilotedMultiplayerGame extends Game {
    public opponentId: string;
    constructor(initPlayerDTO: InitPlayerDTO) {
        super(getNewTetriminoFromTetriminoPiece(initPlayerDTO.currentTetrimino), initPlayerDTO.nextTetriminos);

        this.opponentId = initPlayerDTO.opponentId;
    }

    switchOpponent(opponentId: string) {
        this.opponentId = opponentId;
    }

    private addLines(lines: number) {
        this.numberAddedLines = lines;

        for (let i = 0; i < lines; i++) {
            console.log(this.board.length);
            const list = Array.from({length: this.board[0].length}, () => ColorEnum.BLOCK);

            list[Math.floor(Math.random() * list.length)] = ColorEnum.NONE;

            this.board.push(list);
            console.log(this.board.length);
        }
    }
}
