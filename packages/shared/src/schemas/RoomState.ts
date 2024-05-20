import { Schema, type, MapSchema } from '@colyseus/schema';
import { PlayerState } from './PlayerState';
import { RoomOptions } from '../types/RoomOptions/RoomOptions';

class RoomMetadata extends Schema {
	@type('string') name = '';
	@type('string') icon = '';
	@type('string') gameMode = '';
	@type('number') goalScore = 0;
	@type('boolean') opponentAttacking = false;
}

export class RoomState extends Schema {
	@type(RoomMetadata) metadata: RoomMetadata = new RoomMetadata();

	@type('number') timeoutAt = 0;

	@type('boolean') isPlaying = false;
	@type({ map: PlayerState }) players = new MapSchema<PlayerState>();
	@type('string') winner = '';
	@type('string') admin = '';

	setRoomMetadata(options: RoomOptions) {
		this.metadata.name = options.name;
		this.metadata.icon = options.icon;
		this.metadata.gameMode = options.gameMode;
		this.metadata.goalScore = options.gameOptions.goalScore;
		this.metadata.opponentAttacking = options.gameOptions.opponentAttacking;
	}
}
