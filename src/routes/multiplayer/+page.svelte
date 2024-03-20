<script lang="ts">
    import MenuContainer from "../menu-components/MenuContainer.svelte";
    import RoomCreateForm from "./RoomCreateForm.svelte";
    import MenuHeader from "../menu-components/MenuHeader.svelte";
    import RoomsList from "./RoomsList.svelte";
    import {roomStore} from "./multiplayerStore";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    let currentMenu = "list";

    $: if ($roomStore) goto('/multiplayer/' + $roomStore?.roomId);

    $: console.log(currentMenu);



    onMount(()=>{
        // setup jdenticon programmatically -> module needed for picker (data-jdenticon-value cant be used with nodejs module)
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/jdenticon@3.2.0/dist/jdenticon.min.js';
        script.async = true;
        script.integrity = "sha384-yBhgDqxM50qJV5JPdayci8wCfooqvhFYbIKhv0hTtLvfeeyJMJCscRfFNKIxt43M";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
        window["jdenticon_config"] = { replaceMode: "observe" }
    })
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

