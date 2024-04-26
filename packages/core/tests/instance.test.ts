import { GAME_SPEED, SinglePlayerInstance } from '../src';

jest.useFakeTimers();

test('game should callback according to gamespeed', () => {
  const game = new SinglePlayerInstance();

  const myMethodSpy = jest.spyOn(game, 'handleAction');

  // Fast-forward time
  for (let i = 1; i < 10; i++) {
    jest.advanceTimersByTime(GAME_SPEED);
    expect(myMethodSpy).toHaveBeenCalledTimes(i);
  }
});
