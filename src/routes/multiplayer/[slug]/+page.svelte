<script lang="ts">
    import {onMount} from "svelte";
    import {Room} from 'colyseus.js'
    import {clientStore, roomStore} from "../multiplayerStore";
    import type {RoomState} from "./types/RoomState";
    import RoomWaiting from "./RoomWaiting.svelte";
    import MultiplayerTetris from "./MultiplayerTetris.svelte";
    import {inGame} from "../../controlsStore";
    import {goto} from "$app/navigation";

    export let data;

    let isPlaying: boolean = false;

    async function connect() {
        if (!$clientStore) return;
        const room: Room<RoomState> = await $clientStore.joinById(data.slug, { /* options */});
        room.onError((code, message) => {
            console.log("oops, error ocurred:", code, message);
        });
        room.onLeave(() => {
            console.log("client left the room");
            $roomStore = null;
            goto('/multiplayer/');
        });
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
            if (currentValue === previousValue) return;
            console.log("isPlaying changed", currentValue);
            if (currentValue === true) $inGame = true;
            isPlaying = currentValue;
        });


    })
</script>

{#if $roomStore}
    {#if isPlaying}
        <MultiplayerTetris></MultiplayerTetris>
    {:else}
        <RoomWaiting></RoomWaiting>
    {/if}
{/if}

