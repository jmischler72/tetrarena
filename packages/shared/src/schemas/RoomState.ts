import { Schema, type, MapSchema } from '@colyseus/schema';
import { PlayerState } from './PlayerState';

// Our custom game state, an ArraySchema of type Player only at the moment
export class RoomState extends Schema {
  @type('boolean') isPlaying = false;
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
  @type('string') winner = '';
  @type('string') admin = '';
}
