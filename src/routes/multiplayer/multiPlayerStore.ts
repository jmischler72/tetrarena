import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {GameStateDTO} from "@jmischler72/core-tetris";

export const clientIdStore: Writable<string> = writable("");
export const multiPlayerStore: Writable<Map<string, GameStateDTO>> = writable(new Map<string, GameStateDTO>);
