import { MersenneTwister19937, Random } from 'random-js';
import { ColorEnum } from '../enums/color.enum';

export class CustomRandom extends Random {
  constructor(seed?: number) {
    super(MersenneTwister19937.seed(seed || Date.now()));
  }

  getRandomColor(): ColorEnum {
    return this.tgm3Randomizer().next().value;
  }

  *tgm3Randomizer(): Generator<ColorEnum> {
    const pieces = [
      ColorEnum.LIGHT_BLUE,
      ColorEnum.BLUE,
      ColorEnum.ORANGE,
      ColorEnum.YELLOW,
      ColorEnum.GREEN,
      ColorEnum.PURPLE,
      ColorEnum.RED,
    ];
    const order: any[] = [];

    // Create 35 pool.
    const pool = pieces.concat(pieces, pieces, pieces, pieces);

    // First piece special conditions
    const firstPiece = [ColorEnum.LIGHT_BLUE, ColorEnum.BLUE, ColorEnum.ORANGE, ColorEnum.PURPLE][Math.floor(Math.random() * 4)];
    yield firstPiece;

    const history = [ColorEnum.GREEN, ColorEnum.RED, ColorEnum.GREEN, firstPiece];

    while (true) {
      let i = 0;
      let piece = pool[0];

      // Roll For piece
      for (let roll = 0; roll < 6; ++roll) {
        i = Math.floor(Math.random() * 35);
        piece = pool[i];
        if (!history.includes(piece) || roll === 5) {
          break;
        }
        if (order.length) pool[i] = order[0];
      }

      // Update piece order
      if (order.includes(piece)) {
        order.splice(order.indexOf(piece), 1);
      }
      order.push(piece);

      pool[i] = order[0];

      // Update history
      history.shift();
      history[3] = piece;

      yield piece;
    }
  }
}
