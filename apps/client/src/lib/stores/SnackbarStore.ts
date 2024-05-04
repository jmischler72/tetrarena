import { type Writable, writable } from 'svelte/store';

export const snackbarStore: Writable<string> = writable('');
