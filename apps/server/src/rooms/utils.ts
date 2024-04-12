import { RoomState } from '@jmischler72/types';

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
