import { MersenneTwister19937, Random } from 'random-js';
import { ColorEnum } from 'enums/color.enum';
import { tetriminoPieces } from 'constants/tetriminos';

class CustomRandom extends Random {
  pieces: ColorEnum[] = tetriminoPieces.map((piece) => piece.color);
  pool = this.pieces.concat(this.pieces, this.pieces, this.pieces, this.pieces);

  firstPiece = ['I', 'J', 'L', 'T'][Math.floor(Math.random() * 4)];

  history = ['S', 'Z', 'S', firstPiece];

  constructor(seed?: number) {
    super(MersenneTwister19937.seed(seed || Date.now()));
  }

  getRandomColor(): ColorEnum {
    return tetriminoPieces[this.integer(0, tetriminoPieces.length - 1)].color;
  }
}

/**
 * function* tgm3Randomizer() {
 *   let pieces = ["I", "J", "L", "O", "S", "T", "Z"];
 *   let order = [];
 *
 *   // Create 35 pool.
 *   let pool = pieces.concat(pieces, pieces, pieces, pieces);
 *
 *   // First piece special conditions
 *   const firstPiece = ["I", "J", "L", "T"][Math.floor(Math.random() * 4)];
 *   yield firstPiece;
 *
 *   let history = ["S", "Z", "S", firstPiece];
 *
 *   while (true) {
 *     let roll;
 *     let i;
 *     let piece;
 *
 *     // Roll For piece
 *     for (roll = 0; roll < 6; ++roll) {
 *       i = Math.floor(Math.random() * 35);
 *       piece = pool[i];
 *       if (history.includes(piece) === false || roll === 5) {
 *         break;
 *       }
 *       if (order.length) pool[i] = order[0];
 *     }
 *
 *     // Update piece order
 *     if (order.includes(piece)) {
 *       order.splice(order.indexOf(piece), 1);
 *     }
 *     order.push(piece);
 *
 *     pool[i] = order[0];
 *
 *     // Update history
 *     history.shift();
 *     history[3] = piece;
 *
 *     yield piece;
 *   }
 * }
 */
