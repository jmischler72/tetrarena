<script lang="ts">
    import {joinRoom, leaveRoom} from "$lib/functions/services/RoomService";
    import {roomStore} from "$lib/stores/multiplayerStore";
    import MultiplayerTetris from "./MultiplayerTetris.svelte";
    import RoomWaiting from "./RoomWaiting.svelte";
    import {onMount} from "svelte";
    import MenuWithNavbar from "$lib/components/menu/MenuWithNavbar.svelte";

    export let data;

    let isPlaying: boolean = false;

    $: $roomStore?.state.listen("isPlaying", (currentValue: boolean) => {
        console.log("isPlaying changed", currentValue);
        isPlaying = currentValue;
    });

    onMount(() => {
        joinRoom(data.slug);

        return () => {
            console.log("leaving room");
            leaveRoom();
        }
    });

</script>


{#if $roomStore}
    {#if isPlaying}
        <MultiplayerTetris></MultiplayerTetris>
    {:else}
        <MenuWithNavbar>
            <RoomWaiting />
        </MenuWithNavbar>
    {/if}
{/if}


