<script lang="ts">
    import MenuContainer from "../menu-components/MenuContainer.svelte";
    import RoomCreateForm from "./RoomCreateForm.svelte";
    import MenuHeader from "../menu-components/MenuHeader.svelte";
    import RoomsList from "./RoomsList.svelte";
    import {roomStore} from "./multiplayerStore";
    import {goto} from "$app/navigation";

    let currentMenu = "list";

    $: if ($roomStore) goto('/multiplayer/' + $roomStore?.roomId);

    $: console.log(currentMenu);
</script>


<MenuContainer>
    <div slot="header" class="w-full h-[10%] bg-gray-700/75 pl-10 items-center flex gap-6">
        <MenuHeader on:click={()=> currentMenu = 'list'}
                    menu="{{text: 'Rooms List', icon: 'list', selected: currentMenu === 'list'}}"></MenuHeader>
        <MenuHeader on:click={()=> currentMenu = 'create'}
                    menu="{{text: 'Create Room', icon: 'add_circle', selected: currentMenu === 'create'}}"></MenuHeader>
    </div>
    {#if currentMenu === 'create' }
        <RoomCreateForm></RoomCreateForm>
    {:else }
        <RoomsList></RoomsList>
    {/if}

</MenuContainer>

