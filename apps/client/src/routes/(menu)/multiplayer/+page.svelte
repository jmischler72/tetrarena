<script lang="ts">
    import MenuContainer from "$lib/components/menu/MenuContainer.svelte";
    import RoomCreateForm from "./RoomCreateForm.svelte";
    import MenuButtonHeader from "$lib/components/menu/MenuButtonHeader.svelte";
    import RoomsList from "./RoomsList.svelte";
    import {roomStore, errorStore} from "$lib/stores/multiplayerStore";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import MenuHeader from "$lib/components/menu/MenuHeader.svelte";
    import {createRoom} from "$lib/functions/services/RoomService";
    import MenuFooter from "$lib/components/menu/MenuFooter.svelte";
    import Button from "$lib/components/Button.svelte";
    import type {RoomCreateOptions} from '$lib/data/RoomCreateOptions';
    import {onMount} from "svelte";
    import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";

    let currentMenu = "list";

    let roomCreateOptions: RoomCreateOptions;

    let serverUrl = import.meta.env.VITE_BACKEND_URL + "/version";

    $: if ($roomStore && browser) goto('/game/' + $roomStore?.roomId);

    onMount(() => {
        if ($errorStore) setTimeout(() => ($errorStore = ''), 3000);
    })
</script>


{#await fetch(serverUrl)}
    <div class="w-full h-full flex justify-center items-center">
        <LoadingSpinner/>
    </div>
{:then data}
    <MenuContainer center="{currentMenu === 'create'}">
        <MenuHeader slot="header">
            <MenuButtonHeader on:click={()=> currentMenu = 'list'}
                              button="{{text: 'Rooms List', icon: 'list', selected: currentMenu === 'list'}}"></MenuButtonHeader>
            <MenuButtonHeader on:click={()=> currentMenu = 'create'}
                              button="{{text: 'Create Room', icon: 'add_circle', selected: currentMenu === 'create'}}"></MenuButtonHeader>
        </MenuHeader>
        {#if currentMenu === 'create' }
            <RoomCreateForm bind:roomCreateOptions></RoomCreateForm>

        {:else }
            <RoomsList></RoomsList>
        {/if}


        <MenuFooter slot="footer">
            {#if currentMenu === 'create' }
                <div class="w-[30%] h-[60%]">
                    <Button onClick={()=>createRoom(roomCreateOptions)}
                    >
                        Create the room
                    </Button>
                </div>
            {/if}
        </MenuFooter>
        {#if $errorStore}
            <div class="w-[40%] flex justify-center absolute bottom-10 animation-up border-2 border-solid border-gray-800 bg-gray-700 py-12">
                <h1 class="text-gray-300">{$errorStore}</h1>
            </div>
        {/if}
    </MenuContainer>

{:catch error}
    <div class="w-full h-full flex justify-center items-center text-2xl">
        <h1>Connection Error... <a class="p-1 rounded bg-white text-black no-underline" href="/"
                                   on:click={()=>location.reload()}>Try Again</a></h1>
    </div>
{/await}

<style lang="scss">
    $animation-duration: 0.45s;

    .animation-up {
        animation: $animation-duration ease-out translate_up forwards, $animation-duration ease-out opacityin forwards;
    }

    @keyframes translate_up {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;

        }
    }
</style>

