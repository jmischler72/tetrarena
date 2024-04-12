<script lang="ts">
    import {joinRoom} from '$lib/functions/services/RoomService';
    import {roomStore} from '$lib/stores/multiplayerStore'
    import MultiplayerTetris from './MultiplayerTetris.svelte'
    import WaitingRoom from './WaitingRoom.svelte'
    import MenuWithNavbar from '$lib/components/menu/MenuWithNavbar.svelte'
    import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";

    export let data

    let isPlaying: boolean = false

    //the dollar sign is important to make the listener reactive
    $:$roomStore?.state.listen('isPlaying', (currentValue: boolean) => {
        isPlaying = currentValue
    })
</script>

<svelte:window on:beforeunload={() => {
		if($roomStore)localStorage.setItem('reconnectionToken', $roomStore.reconnectionToken)

}}></svelte:window>

{#await joinRoom(data.slug)}
    <div class="w-full h-full flex justify-center items-center">
        <LoadingSpinner/>
    </div>
{:then data}
    {#if $roomStore}
        {#if isPlaying}
            <MultiplayerTetris></MultiplayerTetris>
        {:else}
            <MenuWithNavbar>
                <WaitingRoom/>
            </MenuWithNavbar>
        {/if}
    {/if}

{:catch error}
    <div class="w-full h-full flex justify-center items-center text-2xl">
        <h1>Connection Error... <a class="p-1 rounded bg-white text-black no-underline" href="/"
                                   on:click={()=>location.reload()}>Try Again</a></h1>
    </div>
{/await}
