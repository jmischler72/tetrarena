<script lang="ts">
    import MenuContainer from "$lib/components/menu/MenuContainer.svelte";
    import RoomCreateForm from "./RoomCreateForm.svelte";
    import MenuButtonHeader from "$lib/components/menu/MenuButtonHeader.svelte";
    import RoomsList from "./RoomsList.svelte";
    import {roomStore} from "$lib/stores/multiplayerStore";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import MenuHeader from "$lib/components/menu/MenuHeader.svelte";
    import {createRoom} from "$lib/functions/services/RoomService";
    import MenuFooter from "$lib/components/menu/MenuFooter.svelte";
    import Button from "$lib/components/Button.svelte";
    import type { RoomCreateOptions } from '$lib/data/RoomCreateOptions';

    let currentMenu = "list";

    let roomCreateOptions: RoomCreateOptions;

    $: if ($roomStore && browser) goto('/game/' + $roomStore?.roomId);
</script>


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
</MenuContainer>

