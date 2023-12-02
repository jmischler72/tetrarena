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
            currentTetrimino: {
                position_x: this.currentTetrimino.position_x,
                position_y: this.currentTetrimino.position_y,
                tetriminoPiece: {
                    shape: getShapeFromTetrimino(this.currentTetrimino),
                    color: this.currentTetrimino.tetriminoPiece.color
                },
            },
            shadowTetrimino: {
                position_x: this.shadowTetrimino.position_x,
                position_y: this.shadowTetrimino.position_y,
                tetriminoPiece: {
                    shape: getShapeFromTetrimino(this.shadowTetrimino),
                    color: this.shadowTetrimino.tetriminoPiece.color
                },
            },
            score: this.score,
            nextTetriminos: this.nextTetriminos.map(tetrimino => {
                return {
                    shape: tetrimino.shapes[0],
                    color: tetrimino.color,
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