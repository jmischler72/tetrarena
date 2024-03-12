<script lang="ts">
    import {onMount} from "svelte";
    import {Room} from 'colyseus.js'
    import {get} from "svelte/store";
    import {clientStore, gameStatesStore, roomStore} from "../multiplayerStore";
    import {toGameStateDTO} from "./types/utils";
    import type {RoomState} from "./types/RoomState";
    import WaitingLobby from "./WaitingLobby.svelte";
    import {goto} from "$app/navigation";

    export let data;

    async function connect() {
        if (!$clientStore) return;
        const room: Room<RoomState> = await $clientStore.joinById(data.slug, { /* options */});
        console.log("joined room", room.id);
        roomStore.set(room);
    }

    onMount(async () => {
        if (!$roomStore) {
            await connect();
        }
        if (!$roomStore) return;
        $roomStore.state.players.onAdd((player, key) => {
            console.log(key, "has been added to the room");
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
            $roomStore = null;
            goto('/multiplayer/');
        });
    })
</script>

{#if $roomStore}
    <p>{$roomStore.roomId} - {$roomStore.state.isPlaying}</p>
    <WaitingLobby></WaitingLobby>
    <!--    <MultiplayerTetris></MultiplayerTetris>-->
{/if}

