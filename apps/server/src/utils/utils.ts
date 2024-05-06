import { PlayerState, RoomState } from '@jmischler72/shared';

export function checkIfAllPlayersAreReady(state: RoomState) {
	let allPlayersReady = true;
	state.players.forEach((player) => {
		if (player.ready === false) {
			allPlayersReady = false;
			return;
		}
	});
	return allPlayersReady;
}

export function findWinner(map: Map<string, PlayerState>): string | undefined {
	let highestScore = -Infinity;
	let keyWithHighestScore: string | undefined;

	for (const [key, obj] of map.entries()) {
		if (obj.gameState.score > highestScore && !obj.gameState.isGameOver) {
			highestScore = obj.gameState.score;
			keyWithHighestScore = key;
		}
	}

	return keyWithHighestScore;
}
