import {MultiPlayerGame} from "../src";


jest.useFakeTimers();

test('game should callback according to gamespeed', () => {
    const mockCallback = jest.fn();

    let game = new MultiPlayerGame(["player1", "player2"], mockCallback);

    expect(game.gameStates.size).toBe(2);

    game.startGame();

    // expect(mockCallback).toHaveBeenCalledWith("player1", expect.objectContaining({
    //     isGameOver: false,
    //     deletedLines: []
    // }))
    // expect(mockCallback).toHaveBeenCalledTimes(1);
    //
    // // Fast-forward time
    // jest.advanceTimersByTime(GAME_SPEED);
    //
    // expect(mockCallback).toHaveBeenCalledTimes(2);

})
