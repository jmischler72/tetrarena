import { RoomState } from './RoomState';
import { type } from '@colyseus/schema';

// Our custom game state, an ArraySchema of type Player only at the moment
export class FirstGameModeRoomState extends RoomState {
  @type('number') goalScore = 100;
}
