import {GameState} from "./GameState";
import {GameStateDTO} from "../types/GameStateDTO";
import {getShapeFromTetrimino} from "../utils/tetriminoHelper";

export class Game extends GameState {
    constructor() {
        super();
    }

    getCurrentGameState(): GameStateDTO {
        return {
            board: this.board,
            score: this.score,
            nextTetriminos: this.nextTetriminos.map(tetrimino => {
                return {
                    shape: getShapeFromTetrimino(tetrimino),
                    color: tetrimino.tetriminoPiece.color,
                };
            }),
            isGameOver: this.isGameOver,
            deletedLines: this.deletedLines,
            numberAddedLines: this.numberAddedLines,
            currentTetriminoFreezed: this.currentTetriminoFreezed,
        };
    }

    clearOnDispatch(): void {
        this.deletedLines = [];
        this.numberAddedLines = 0;
        this.currentTetriminoFreezed = false;
    }

}