# core_tetris

## How to start a game
The Game Class takes a callback in his constructor, 
this callback is called every time the game is updated.

You can instantiate a game like this :

```
function callbackOnGameUpdate(){
    console.log('game update');
}

let game = new Game(callbackOnGameUpdate);
```

To handle actions such as <em>go left</em> or <em>go right</em>, 
you can use the ```handleAction``` function with an ```ActionsEnum``` action.

## Exported Classes
### Classes

- SinglePlayerGame : <strong>Used to instantiate a game</strong>
  - Is used for the client to instantiate singleplayer games
- Game : <strong> The state of the game at any given point</strong>
  - expose two functions handleAction, getGameState and clearOnDispatch to interact
  - Is used for the server to control multiple gamestate
### Types

- PlayerStateDTO : <strong>Used to pass updated game states</strong>

### Enums
- ActionsEnum : <strong>Used to handle different actions in the game</strong>
- ColorEnum : <strong>Used to handle data in the game board</strong>