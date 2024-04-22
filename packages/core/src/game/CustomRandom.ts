import { MersenneTwister19937, Random } from 'random-js';
import { ColorEnum } from '../enums/color.enum';

export class CustomRandom extends Random {
  private pieces = [
    ColorEnum.LIGHT_BLUE,
    ColorEnum.BLUE,
    ColorEnum.ORANGE,
    ColorEnum.YELLOW,
    ColorEnum.GREEN,
    ColorEnum.PURPLE,
    ColorEnum.RED,
  ];
  private order: any[] = [];

  private pool = this.pieces.concat(this.pieces, this.pieces, this.pieces, this.pieces);

  private firstPiece = [ColorEnum.LIGHT_BLUE, ColorEnum.BLUE, ColorEnum.ORANGE, ColorEnum.PURPLE][this.integer(0, 3)];
  private history = [ColorEnum.GREEN, ColorEnum.RED, ColorEnum.GREEN, this.firstPiece];

  constructor(seed?: number) {
    super(MersenneTwister19937.seed(seed || Date.now()));
  }

  getFirstPiece() {
    return this.firstPiece;
  }

  tgm3Randomizer(): ColorEnum {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      let i = 0;
      let piece = this.pool[0];

      // Roll For piece
      for (let roll = 0; roll < 6; ++roll) {
        i = this.integer(0, 34);
        piece = this.pool[i];
        if (!this.history.includes(piece) || roll === 5) {
          break;
        }
        if (this.order.length) this.pool[i] = this.order[0];
      }

      // Update piece order
      if (this.order.includes(piece)) {
        this.order.splice(this.order.indexOf(piece), 1);
      }
      this.order.push(piece);

      this.pool[i] = this.order[0];

      // Update history
      this.history.shift();
      this.history[3] = piece;

      return piece;
    }
  }
}
