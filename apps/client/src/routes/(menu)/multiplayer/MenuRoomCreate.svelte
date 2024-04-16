<script lang='ts'>
  import Button from '$lib/components/Button.svelte';
  import type { RoomCreateOptions } from '$lib/data/RoomCreateOptions';
  import { createRoom } from '$lib/functions/services/RoomService';
  import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
  import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
  import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
  import RoomCreateForm from './RoomCreateForm.svelte';

  let roomCreateOptions: RoomCreateOptions;
  let creating = false;

</script>
<MenuContainer>
  {#if creating}
    <AsyncMenu callback="{()=>createRoom(roomCreateOptions)}"></AsyncMenu>
  {:else }
    <RoomCreateForm bind:roomCreateOptions></RoomCreateForm>
  {/if}
</MenuContainer>

<MenuFooter>
  <div class='w-[30%] h-[60%]'>
    <Button onClick={()=>creating = true}
    >
      Create the room
    </Button>
  </div>
</MenuFooter>