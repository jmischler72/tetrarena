import {GAME_SPEED} from "../src/constants/game";
import {SinglePlayerGame} from "../src";


jest.useFakeTimers();

test('game should callback according to gamespeed', () => {
    const mockCallback = jest.fn();

    let game = new SinglePlayerGame(mockCallback);
    game.startGame();

    expect(mockCallback).toHaveBeenCalledTimes(1);

    // Fast-forward time
    jest.advanceTimersByTime(GAME_SPEED);

    expect(mockCallback).toHaveBeenCalledTimes(2);

})
