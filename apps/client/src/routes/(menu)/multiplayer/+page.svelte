<script lang='ts'>
  import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
  import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
  import RoomsList from './RoomsList.svelte';
  import { errorStore, roomStore } from '$lib/stores/multiplayerStore';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
  import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
  import MenuRoomCreate from './MenuRoomCreate.svelte';

  let currentMenu = 'list';

  $: if ($roomStore && browser) goto('/multiplayer/' + $roomStore?.roomId);

  $: if ($errorStore) setTimeout(() => ($errorStore = ''), 3000);
</script>


<AsyncMenu callback="{()=> fetch(import.meta.env.VITE_BACKEND_URL + '/version')}">
  <MenuHeader>
    <MenuButtonHeader on:click={()=> currentMenu = 'list'}
                      text='Rooms List'
                      icon='list'
                      selected="{currentMenu === 'list'}"
    ></MenuButtonHeader>
    <MenuButtonHeader on:click={()=> currentMenu = 'create'}
                      text='Create Room'
                      icon='add_circle'
                      selected="{currentMenu === 'create'}"
    ></MenuButtonHeader>
  </MenuHeader>
  {#if currentMenu === 'create' }

    <MenuRoomCreate />
  {:else }
    <MenuContainer>
      <RoomsList></RoomsList>
    </MenuContainer>
  {/if}

  {#if $errorStore}
    <div
      class='w-[40%] flex justify-center absolute bottom-10 animation-up border-2 border-solid border-gray-800 bg-gray-700 py-12'>
      <h1 class='text-gray-300'>{$errorStore}</h1>
    </div>
  {/if}
</AsyncMenu>

<style lang='scss'>
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

