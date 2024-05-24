import { writable, type Writable } from 'svelte/store';

export const isRoomEditingStore: Writable<boolean> = writable(false);
