import { derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { Client, Room } from 'colyseus.js';
import { type RoomState, type UserInfos } from '@jmischler72/shared';
import type { User } from 'firebase/auth';

export const clientStore: Writable<Client> = writable(new Client(import.meta.env.VITE_SERVER_URL));
export const roomStore: Writable<Room<RoomState> | null> = writable(null);
export const roomStateStore: Writable<RoomState | null> = writable(null);
export const userStore: Writable<User | null> = writable();
