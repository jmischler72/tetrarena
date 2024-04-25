import { Schema, type } from '@colyseus/schema';

// Our custom game state, an ArraySchema of type Player only at the moment
export class RoyaleGameModeOptions extends Schema {
  @type('number') goalScore = 100;
}
