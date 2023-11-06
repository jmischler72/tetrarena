import { PlayerGameState } from './PlayerGameState';
import { ActionsEnum } from './enums/actions.enum';


export class Game {
  protected readonly playerGameState: PlayerGameState = new PlayerGameState();

  public handleAction(action: ActionsEnum){
    this.playerGameState.handleAction(action);
  }

  public updateGame(){
    this.playerGameState.handleAction(ActionsEnum.GO_DOWN);
  }

  public getPlayerGameState(){
    this.playerGameState.getPlayerState();
  }
}




