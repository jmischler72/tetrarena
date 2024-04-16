<script lang="ts">
    import MenuContainer from "$lib/components/menu/MenuContainer.svelte";
    import RoomCreateForm from "./RoomCreateForm.svelte";
    import MenuButtonHeader from "$lib/components/menu/MenuButtonHeader.svelte";
    import RoomsList from "./RoomsList.svelte";
    import {errorStore, roomStore} from "$lib/stores/multiplayerStore";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import MenuHeader from "$lib/components/menu/MenuHeader.svelte";
    import {createRoom} from "$lib/functions/services/RoomService";
    import MenuFooter from "$lib/components/menu/MenuFooter.svelte";
    import Button from "$lib/components/Button.svelte";
    import type {RoomCreateOptions} from '$lib/data/RoomCreateOptions';
    import AsyncMenu from "$lib/components/menu/AsyncMenu.svelte";

    let currentMenu = "list";

    let roomCreateOptions: RoomCreateOptions;

    $: if ($roomStore && browser) goto('/multiplayer/' + $roomStore?.roomId);

    $: if ($errorStore) setTimeout(() => ($errorStore = ''), 3000);


</script>


<AsyncMenu callback="{()=> fetch(import.meta.env.VITE_BACKEND_URL + '/version')}">
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
</AsyncMenu>

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

