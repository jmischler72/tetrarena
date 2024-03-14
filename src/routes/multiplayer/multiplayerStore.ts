import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {GameStateDTO} from "@jmischler72/core-tetris";
import {Client, Room} from "colyseus.js";
import type {RoomState} from "./[slug]/types/RoomState";

export const clientStore: Writable<Client> = writable(new Client(import.meta.env.VITE_BACKEND_URL));
export const roomStore: Writable<Room<RoomState> | null> = writable(null);
export const gameStatesStore: Writable<Map<string, GameStateDTO>> = writable(new Map<string, GameStateDTO>);