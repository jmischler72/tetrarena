<script lang="ts">
    import {Room} from "colyseus.js";
    import {onMount} from "svelte";
    import {Client} from 'colyseus.js'
    import {RoomState} from "./types/RoomState";
    import {get} from "svelte/store";
    import {clientIdStore, clientStore, multiPlayerStore} from "../multiPlayerStore";
    import MultiplayerTetris from "../../../TetrisPixi/MultiplayerTetris.svelte";
    import {toGameStateDTO} from "./types/utils";
    import {ActionsEnum} from "@jmischler72/core-tetris";

    let room: Room<RoomState> | null = null;

    async function connect() {
        let client: Client | null = get(clientStore);
        if (!client) return;
        room = await client.joinOrCreate("my_room", { /* options */});
        clientIdStore.set(room.sessionId);
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

        await connect();
        if (room) {
            room.state.players.onAdd((player, key) => {
                console.log(player, "has been added at", key);
                // add your player entity to the game world!
                // If you want to track changes on a child object inside a map, this is a common pattern:
                player.onChange(() => {
                    let playersStore = get(multiPlayerStore);
                    playersStore.set(key, toGameStateDTO(player));
                    console.log(key + "changed");
                })
            });
            room.onLeave((code) => {
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

{#if room}
    <p>{room.sessionId} - {room.state.isPlaying}</p>
    <MultiplayerTetris></MultiplayerTetris>
{/if}

