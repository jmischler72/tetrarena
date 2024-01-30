import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {GameStateDTO} from "@jmischler72/core-tetris";
import {Client} from "colyseus.js";

export const clientIdStore: Writable<string> = writable("");
export const clientStore: Writable<Client | null> = writable(null);
export const multiPlayerStore: Writable<Map<string, GameStateDTO>> = writable(new Map<string, GameStateDTO>);
