import {SinglePlayerInstance} from "../src";
import {GAME_SPEED} from "../src";


jest.useFakeTimers();

test('game should callback according to gamespeed', () => {

    let game = new SinglePlayerInstance();

    const myMethodSpy = jest.spyOn(game, 'handleAction');

    game.startGame();

    expect(myMethodSpy).toHaveBeenCalledTimes(1);

    // Fast-forward time
    jest.advanceTimersByTime(GAME_SPEED);

    expect(myMethodSpy).toHaveBeenCalledTimes(2);

})
