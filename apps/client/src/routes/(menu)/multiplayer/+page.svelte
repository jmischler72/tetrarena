<script lang='ts'>
  import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
  import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
  import RoomsList from './RoomsList.svelte';
  import { roomStore } from '$lib/stores/multiplayerStore';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
  import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
  import MenuRoomCreate from './MenuRoomCreate.svelte';
  import { onMount } from 'svelte';
  import { leaveRoom } from '$lib/functions/services/RoomService';

  let currentMenu = 'list';

  $: if ($roomStore && browser) goto('/multiplayer/' + $roomStore?.roomId);


  onMount(() => {
    leaveRoom();
  });
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
</AsyncMenu>
