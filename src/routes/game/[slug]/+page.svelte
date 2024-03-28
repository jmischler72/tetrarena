<script lang="ts">
    import {joinRoom, leaveRoom} from "$lib/functions/services/RoomService";
    import {roomStore} from "$lib/stores/multiplayerStore";
    import MultiplayerTetris from "./MultiplayerTetris.svelte";
    import WaitingRoom from "./WaitingRoom.svelte";
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
        <h1>playing</h1>
        <MultiplayerTetris></MultiplayerTetris>
    {:else}
        <MenuWithNavbar>
            <WaitingRoom/>
        </MenuWithNavbar>
    {/if}
{/if}


