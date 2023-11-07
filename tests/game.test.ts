import {Game} from "../src/Game";
import {GAME_SPEED} from "../src/constants/game";


jest.useFakeTimers();

test('game should callback according to gamespeed', () => {
    const mockCallback = jest.fn();

    let game = new Game(mockCallback);
    game.startGame();

    expect(mockCallback).toHaveBeenCalledTimes(1);

    // Fast-forward time
    jest.advanceTimersByTime(GAME_SPEED);

    expect(mockCallback).toHaveBeenCalledTimes(2);

})
