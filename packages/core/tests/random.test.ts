import { CustomRandom } from '../src';
import { ColorEnum } from '@';
describe('Randomizer', () => {
  test('tgm3Randomizer generates pieces correctly', () => {
    const randomizer = new CustomRandom();

    const generatedPieces: ColorEnum[] = [randomizer.getFirstPiece()];
    const numberPieces = 15;
    for (let i = 0; i < numberPieces - 1; i++) {
      generatedPieces.push(randomizer.tgm3Randomizer());
    }

    expect(generatedPieces.length).toBe(numberPieces);
    // no two consecutive pieces are the same
    for (let i = 0; i < generatedPieces.length - 1; i++) {
      expect(generatedPieces[i]).not.toBe(generatedPieces[i + 1]);
    }
  });
});
