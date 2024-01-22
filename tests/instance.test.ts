import {GAME_SPEED, SinglePlayerInstance} from "../src";


jest.useFakeTimers();

test('game should callback according to gamespeed', () => {

    let game = new SinglePlayerInstance();

    const myMethodSpy = jest.spyOn(game, 'handleAction');


    // Fast-forward time
    jest.advanceTimersByTime(GAME_SPEED);
    expect(myMethodSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(GAME_SPEED);
    expect(myMethodSpy).toHaveBeenCalledTimes(2);

})
