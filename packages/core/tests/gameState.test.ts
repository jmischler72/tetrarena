import { Game } from '../src';

jest.useFakeTimers();

test('should every id of linesId be different', () => {
	const game = new Game();

	const linesId = game.getCurrentGameState().linesId;
	for (let i = 0; i < linesId.length; i++) {
		for (let j = i + 1; j < linesId.length; j++) {
			expect(linesId[i]).not.toEqual(linesId[j]);
		}
	}
});
