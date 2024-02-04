import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {GameStateDTO} from "@jmischler72/core-tetris";
import {Client, Room} from "colyseus.js";
import type {RoomState} from "./[slug]/types/RoomState";

export const clientIdStore: Writable<string> = writable("");
export const clientStore: Writable<Client | null> = writable(null);
export const roomStore: Writable<Room<RoomState> | null> = writable(null);
export const gameStatesStore: Writable<Map<string, GameStateDTO>> = writable(new Map<string, GameStateDTO>);
