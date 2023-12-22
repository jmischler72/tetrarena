import {Game} from "../Game";
import {PlayerState} from "../../types/multiplayer/PlayerState";

export class PilotedMultiplayerGame extends Game {
    public opponentId: string;

    constructor(playerState: PlayerState) {
        super(playerState.currentTetrimino, playerState.nextTetriminos);

        this.opponentId = playerState.opponentId;
    }

    setPlayerState(playerState: PlayerState) {
        this.opponentId = playerState.opponentId;
        this.currentTetrimino = playerState.currentTetrimino;
        this.nextTetriminos = playerState.nextTetriminos;
        if (playerState.board) this.board = playerState.board;
        if (playerState.score) this.score = playerState.score;
    }

    switchOpponent(opponentId: string) {
        this.opponentId = opponentId;
    }
}
