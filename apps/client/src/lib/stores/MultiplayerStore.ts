import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { Client, Room } from 'colyseus.js';
import type { RoomState } from '@jmischler72/shared';

export const clientStore: Writable<Client> = writable(new Client(import.meta.env.VITE_SERVER_URL));
export const roomStore: Writable<Room<RoomState> | null> = writable(null);

export const roomStateStore: Writable<RoomState | null> = writable(null);

roomStore.subscribe((value) => {
	if (!value) {
		roomStateStore.set(null);
	} else {
		value.onStateChange((state) => {
			if (state) roomStateStore.set(state);
		});
	}
});
