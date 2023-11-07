import { GameState } from './GameState';
import {GameStateDTO} from "./types/GameStateDTO";
import {getShapeFromTetrimino} from "./utils/tetriminoHelper";

export class Game extends GameState{
  protected readonly gameState: GameState = new GameState();

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
      currentTetriminoFreezed: this.currentTetriminoFreezed,
    };
  }

  clearOnDispatch(): void{
    this.deletedLines = [];
    this.currentTetriminoFreezed = false;
  }
}




