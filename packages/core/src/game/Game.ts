import { GameState } from './GameState';
import { GameStateDTO } from '../types/GameStateDTO';

export class Game extends GameState {
  getCurrentGameState(): GameStateDTO {
    return {
      board: this.board,
      currentTetrimino: this.currentTetrimino,
      shadowTetrimino: this.shadowTetrimino,
      score: this.score,
      nextTetriminos: this.nextTetriminos,
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
