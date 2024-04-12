import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { Client, Room } from 'colyseus.js';
import type { RoomState } from '@jmischler72/types';
import type { Player } from '$lib/functions/Player';

export const clientStore: Writable<Client> = writable(new Client(import.meta.env.VITE_BACKEND_URL));
export const roomStore: Writable<Room<RoomState> | null> = writable(null);
export const playersStore: Writable<Map<string, Player>> = writable(new Map<string, Player>());
export const errorStore: Writable<string> = writable('');
