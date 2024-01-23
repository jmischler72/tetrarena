import {Schema, type, MapSchema} from "@colyseus/schema";
import {Player} from "./PlayerState";


// Our custom game state, an ArraySchema of type Player only at the moment
export class RoomState extends Schema {
    @type("boolean") isPlaying: boolean = false;
    @type({map: Player}) players = new MapSchema<Player>();
}