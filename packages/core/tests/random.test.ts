import { CustomRandom } from '../src';
describe('Randomizer', () => {
  test('tgm3Randomizer generates pieces correctly', () => {
    const randomizer = new CustomRandom();
    const generator = randomizer.tgm3Randomizer();

    const generatedPieces: string[] = [];
    for (let i = 0; i < 10; i++) {
      generatedPieces.push(generator.next().value);
    }

    expect(generatedPieces.length).toBe(10);
    // no two consecutive pieces are the same
    for (let i = 0; i < generatedPieces.length - 1; i++) {
      expect(generatedPieces[i]).not.toBe(generatedPieces[i + 1]);
    }
  });
});
