<script lang="ts">
    import {joinRoom, leaveRoom} from "../RoomService";
    import {roomStore} from "../multiplayerStore";
    import {inGame} from "../../controlsStore";
    import MultiplayerTetris from "./MultiplayerTetris.svelte";
    import RoomWaiting from "./RoomWaiting.svelte";
    import {onDestroy} from "svelte";

    export let data;

    let isPlaying: boolean = false;

    $: $roomStore?.state.listen("isPlaying", (currentValue, previousValue) => {
        if (currentValue === previousValue) return;
        console.log("isPlaying changed", currentValue);
        // if (currentValue === true) $inGame = true;
        isPlaying = currentValue;
    });

    onDestroy(() => {
        console.log("destroying room");
        leaveRoom();
    });

</script>

{#await joinRoom(data.slug)}
    loading
{:then value}
    {#if $roomStore}
        {#if isPlaying}
            <MultiplayerTetris></MultiplayerTetris>
        {:else}
            <RoomWaiting></RoomWaiting>
        {/if}
    {/if}
{:catch error}
    failed with {error}
{/await}


