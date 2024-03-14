<script lang="ts">
    import {onMount} from "svelte";
    import {Room} from 'colyseus.js'
    import {get} from "svelte/store";
    import {clientStore, gameStatesStore, roomStore} from "../multiplayerStore";
    import {toGameStateDTO} from "./types/utils";
    import type {RoomState} from "./types/RoomState";
    import WaitingLobby from "./WaitingLobby.svelte";
    import {goto} from "$app/navigation";
    import MultiplayerTetris from "../../../TetrisPixi/MultiplayerTetris.svelte";
    import {inGame} from "../../controlsStore";

    export let data;

    let isPlaying: boolean = false;

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
        console.log("page mounted");

        $roomStore.state.listen("isPlaying", (currentValue, previousValue) => {
            if(currentValue === previousValue) return;
            console.log("isPlaying changed", currentValue);
            if(currentValue===true) $inGame = true;
            isPlaying = currentValue;
        }, true);

        $roomStore.state.players.onAdd((player, key) => {
            console.log(key, "has been added to the room");
            // add your player entity to the game world!
            // If you want to track changes on a child object inside a map, this is a common pattern:
            player.onChange(() => {
                let gameStates = get(gameStatesStore);
                gameStates.set(key, toGameStateDTO(player));
            })
        });
        $roomStore.onError((code, message) => {
            console.log("oops, error ocurred:", code, message);
        });
        $roomStore.onLeave(() => {
            console.log("client left the room");
            $roomStore = null;
            goto('/multiplayer/');
        });
    })
</script>

{#if $roomStore}
    {#if isPlaying}
        <MultiplayerTetris></MultiplayerTetris>
    {:else}
        <p>{$roomStore.roomId} - {isPlaying}</p>
        <WaitingLobby></WaitingLobby>
    {/if}
{/if}

