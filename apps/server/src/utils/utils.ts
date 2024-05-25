import { PlayerState, RoomState } from '@jmischler72/shared';

export function checkIfAllPlayersAreReady(state: RoomState) {
	let allPlayersReady = true;
	state.players.forEach((player: PlayerState) => {
		if (player.ready === false) {
			allPlayersReady = false;
			return;
		}
	});
	return allPlayersReady;
}

export function findWinner(map: Map<string, PlayerState>): PlayerState {
	let highestScore = -Infinity;
	let playerWithHighestScore: PlayerState;

	for (const [key, obj] of map.entries()) {
		if (obj.gameState.score > highestScore && !obj.gameState.isGameOver) {
			highestScore = obj.gameState.score;
			playerWithHighestScore = obj;
		}
	}

	if (!playerWithHighestScore) {
		map.forEach((player, key) => {
			if (!player.gameState.isGameOver) playerWithHighestScore = player;
		});
	}

	return playerWithHighestScore;
}
