import { RoomState } from './RoomState';
import { type } from '@colyseus/schema';

export class FirstGameModeRoomState extends RoomState {
	@type('number') goalScore = 100;
	@type('boolean') opponentAttacking = false;
}
