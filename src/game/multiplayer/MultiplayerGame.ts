import {ActionsEnum} from "../../enums/actions.enum";
import {getRandomTetriminoPiece} from "../../constants/tetriminos";
import {GameEvent} from "../../types/multiplayer/GameEvent";
import {getShadowTetriminos} from "../../utils/tetriminoHelper";
import {PlayerState} from "../../types/multiplayer/PlayerState";
import {GameState} from "../GameState";

export class MultiplayerGame extends GameState {

    constructor(public id: string, public opponentId: string) {
        super();
    }

    switchOpponent(opponentId: string) {
        this.opponentId = opponentId;
    }

    getCurrentPlayerState(isInitialization: boolean): PlayerState {
        return {
            id: this.id,
            opponentId: this.opponentId,
            currentTetrimino: this.currentTetrimino,
            nextTetriminos: this.nextTetriminos,
            board: isInitialization ? undefined : this.board,
            score: isInitialization ? undefined : this.score,
        }
    }

    updateGameState(action: ActionsEnum): GameEvent | null {
        let hasActionBeenDone = this.handleAction(action);
        let nextTetrimino = undefined;

        if ((action === ActionsEnum.GO_DOWN && !hasActionBeenDone) || action === ActionsEnum.INSTANT_PLACE) {
            this.drawShapeOnBoard(this.currentTetrimino);
            this.checkBreakLine();
            nextTetrimino = getRandomTetriminoPiece();
            this.checkForGameOver(nextTetrimino);
        }

        this.shadowTetrimino = getShadowTetriminos(this.currentTetrimino, this.board);
        if (hasActionBeenDone || nextTetrimino) {
            return {
                action: action,
                nextTetrimino: nextTetrimino
            }
        }
        return null;
    }
}
