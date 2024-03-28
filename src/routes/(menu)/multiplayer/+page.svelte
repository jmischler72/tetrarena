<script lang="ts">
    import MenuContainer from "$lib/components/menu/MenuContainer.svelte";
    import RoomCreateForm from "./RoomCreateForm.svelte";
    import MenuButtonHeader from "$lib/components/menu/MenuButtonHeader.svelte";
    import RoomsList from "./RoomsList.svelte";
    import {roomStore} from "$lib/stores/multiplayerStore";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import MenuHeader from "$lib/components/menu/MenuHeader.svelte";

    let currentMenu = "list";

    $: if ($roomStore && browser) goto('/game/' + $roomStore?.roomId);
</script>


<MenuContainer>
    <MenuHeader slot="header">
        <MenuButtonHeader on:click={()=> currentMenu = 'list'}
                    button="{{text: 'Rooms List', icon: 'list', selected: currentMenu === 'list'}}"></MenuButtonHeader>
        <MenuButtonHeader on:click={()=> currentMenu = 'create'}
                    button="{{text: 'Create Room', icon: 'add_circle', selected: currentMenu === 'create'}}"></MenuButtonHeader>
    </MenuHeader>
    {#if currentMenu === 'create' }
        <RoomCreateForm></RoomCreateForm>
    {:else }
        <RoomsList></RoomsList>
    {/if}
</MenuContainer>

