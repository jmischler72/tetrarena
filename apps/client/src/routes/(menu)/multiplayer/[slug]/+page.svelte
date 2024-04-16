<script lang="ts">
    import {joinRoom} from '$lib/functions/services/RoomService';
    import {roomStore} from '$lib/stores/multiplayerStore'
    import MultiplayerTetris from './MultiplayerTetris.svelte'
    import WaitingRoom from './WaitingRoom.svelte'
    import AsyncMenu from "$lib/components/menu/AsyncMenu.svelte";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";

    export let data

    let isPlaying: boolean = false

    //the dollar sign is important to make the listener reactive
    $:$roomStore?.state.listen('isPlaying', (currentValue: boolean) => {
        isPlaying = currentValue
    })

    $:if (!$roomStore && browser) goto('/multiplayer');
</script>

<svelte:window on:beforeunload={() => {
		if($roomStore)localStorage.setItem('reconnectionToken', $roomStore.reconnectionToken)

}}></svelte:window>

<AsyncMenu callback="{()=> joinRoom(data.slug)}">
    {#if isPlaying}
        <MultiplayerTetris></MultiplayerTetris>
    {:else}
        <WaitingRoom/>
    {/if}
</AsyncMenu>
