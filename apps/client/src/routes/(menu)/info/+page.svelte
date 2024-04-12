<script lang="ts">
    import MenuContainer from "$lib/components/menu/MenuContainer.svelte";
    import MenuButtonHeader from "$lib/components/menu/MenuButtonHeader.svelte";
    import MenuHeader from "$lib/components/menu/MenuHeader.svelte";
    import VersionMenu from "./VersionMenu.svelte";
    import ChangelogMenu from "./ChangelogMenu.svelte";

    let currentMenu = 'version';
</script>

<MenuContainer>
    <MenuHeader slot="header">
        <MenuButtonHeader on:click={()=> currentMenu = 'version'}
                          button="{{text: 'Version', icon: 'keyboard', selected: currentMenu === 'version'}}"/>
        <MenuButtonHeader on:click={()=> currentMenu = 'changelog'}
                          button="{{text: 'Changelog', icon: 'keyboard', selected: currentMenu === 'changelog'}}"/>
    </MenuHeader>

    {#if currentMenu === 'version'}
        <VersionMenu/>
    {:else }
        <ChangelogMenu/>
    {/if}

</MenuContainer>