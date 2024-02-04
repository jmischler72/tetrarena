<script lang="ts">
    import {onMount} from "svelte";
    import {Client, Room} from 'colyseus.js'
    import {get} from "svelte/store";
    import { clientStore, gameStatesStore, roomStore} from "../multiplayerStore";
    import MultiplayerTetris from "../../../TetrisPixi/MultiplayerTetris.svelte";
    import {toGameStateDTO} from "./types/utils";
    import {ActionsEnum} from "@jmischler72/core-tetris";
    import type {RoomState} from "./types/RoomState";


    async function connect() {
        let client: Client | null = get(clientStore);
        if (!client) return;
        const room: Room<RoomState> = await client.joinById("my_room", { /* options */});
        roomStore.set(room);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.defaultPrevented) {
            return;
        }

        let action: ActionsEnum | null = null;
        switch (event.code) {
            case "ArrowDown":
                action = ActionsEnum.GO_DOWN;
                break;
            case "ArrowLeft":
                action = ActionsEnum.GO_LEFT;
                break;
            case "ArrowRight":
                action = ActionsEnum.GO_RIGHT;
                break;
            case "Space":
                action = ActionsEnum.ROTATE;
                break;
            case "ShiftLeft":
                action = ActionsEnum.INSTANT_PLACE;
                break;
        }
        if (action) onInput(action);
    }

    onMount(async () => {
        window.onkeydown = handleKeydown;

        if ($roomStore === null) {
            await connect();
        } else {
            $roomStore.state.players.onAdd((player, key) => {
                console.log(player, "has been added at", key);
                // add your player entity to the game world!
                // If you want to track changes on a child object inside a map, this is a common pattern:
                player.onChange(() => {
                    let gameStates = get(gameStatesStore);
                    gameStates.set(key, toGameStateDTO(player));
                    console.log(key + "changed");
                })
            });
            $roomStore.onLeave(() => {
                console.log("client left the room");
            });
        }


    })


    function onInput(action: ActionsEnum) {
        if (room) {
            room.send("action", action);
        }
    }
</script>

{#if $roomStore}
    <p>{$roomStore.sessionId} - {$roomStore.state.isPlaying}</p>
    <MultiplayerTetris></MultiplayerTetris>
{/if}

