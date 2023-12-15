import {ColorEnum} from "../../enums/color.enum";
import {Game} from "../Game";
import {InitPlayerDTO} from "../../types/multiplayer/InitPlayerDTO";

export class MultiplayerGame extends Game {

    constructor(public id: string, public opponentId: string) {
        super();
    }

    switchOpponent(opponentId: string) {
        this.opponentId = opponentId;
    }

    getInitPlayerDTO(): InitPlayerDTO{
        return {
            id: this.id,
            opponentId: this.opponentId,
            currentTetrimino: this.currentTetrimino.tetriminoPiece,
            nextTetriminos: this.nextTetriminos
        }
    }

    addLines(lines: number) {
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
