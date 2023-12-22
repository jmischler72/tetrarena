import {GameState} from "./GameState";
import {GameStateDTO, TetriminoDTO} from "../types/GameStateDTO";
import {getShapeFromTetrimino} from "../utils/tetriminoHelper";
import {Tetrimino} from "../types/Tetrimino";
import {TetriminoPiece} from "../constants/tetriminos";

export class Game extends GameState {
    constructor(currentTetrimino?: Tetrimino, nextTetriminos?: TetriminoPiece[]) {
        super(currentTetrimino, nextTetriminos);
    }

    getCurrentGameState(): GameStateDTO {
        let gamestate = {
            board: this.board,
            currentTetrimino: this.getTetriminoDTO(this.currentTetrimino),
            shadowTetrimino: this.getTetriminoDTO(this.shadowTetrimino),
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
        this.clearOnDispatch();
        return gamestate;
    }

    clearOnDispatch(): void {
        this.deletedLines = [];
        this.numberAddedLines = 0;
        this.currentTetriminoFreezed = false;
    }

    private getTetriminoDTO(tetrimino: Tetrimino): TetriminoDTO {
        return {
            position_x: tetrimino.position_x,
            position_y: tetrimino.position_y,
            tetriminoPiece: {
                shape: getShapeFromTetrimino(tetrimino),
                color: tetrimino.tetriminoPiece.color
            },
        }
    }
}