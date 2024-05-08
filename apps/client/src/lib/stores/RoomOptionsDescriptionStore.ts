import { type Writable, writable } from 'svelte/store';

export const roomOptionsDescriptionStore: Writable<string> = writable('');
