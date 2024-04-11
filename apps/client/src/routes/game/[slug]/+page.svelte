<script lang="ts">
    import { joinRoom } from '$lib/functions/services/RoomService';
    import {roomStore} from "$lib/stores/multiplayerStore";
    import MultiplayerTetris from "./MultiplayerTetris.svelte";
    import WaitingRoom from "./WaitingRoom.svelte";
    import {  onMount } from 'svelte';
    import MenuWithNavbar from "$lib/components/menu/MenuWithNavbar.svelte";

    export let data;

    let isPlaying: boolean = false;

    $roomStore?.state.listen("isPlaying", (currentValue: boolean) => {
        isPlaying = currentValue;
    });

    onMount(() => {
        joinRoom(data.slug);
    });
</script>

<svelte:window on:beforeunload={() => {if(!isPlaying) $roomStore?.leave(false)}}></svelte:window>

{#if $roomStore}
    {#if isPlaying}
        <MultiplayerTetris></MultiplayerTetris>
    {:else}
        <MenuWithNavbar>
            <WaitingRoom/>
        </MenuWithNavbar>
    {/if}
{/if}


