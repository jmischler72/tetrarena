import {ActionsEnum} from "../../enums/actions.enum";
import {ColorEnum} from "../../enums/color.enum";
import {Game} from "../Game";

export class Player extends Game {
    private opponent: Player;

    constructor() {
        super();
    }

    switchOpponent(opponent: Player) {
        this.opponent = opponent;
    }

    handleAction(action: ActionsEnum): boolean {
        let hasActionBeenDone = super.handleAction(action);

        this.opponent.addLines(this.deletedLines.length);

        return hasActionBeenDone;
    }

    private addLines(lines: number) {
        this.opponent.numberAddedLines = lines;

        for (let i = 0; i < lines; i++) {
            console.log(this.board.length);
            const list = Array.from({length: this.board[0].length}, () => ColorEnum.BLOCK);

            list[Math.floor(Math.random() * list.length)] = ColorEnum.NONE;

            this.board.push(list);
            console.log(this.board.length);
        }
    }
}
