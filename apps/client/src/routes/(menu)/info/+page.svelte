<script lang="ts">
    import MenuContainer from "$lib/components/menu/subcomponents/MenuContainer.svelte";
    import MenuButtonHeader from "$lib/components/menu/subcomponents/MenuButtonHeader.svelte";
    import MenuHeader from "$lib/components/menu/subcomponents/MenuHeader.svelte";
    import VersionMenu from "./VersionMenu.svelte";
    import ChangelogMenu from "./ChangelogMenu.svelte";

    let currentMenu = 'version';
</script>

<MenuHeader>
    <MenuButtonHeader on:click={()=> currentMenu = 'version'}
                      text='Version'
                      icon='keyboard'
                      selected="{currentMenu === 'version'}"/>
    <MenuButtonHeader on:click={()=> currentMenu = 'changelog'}
                      text='Changelog'
                      icon='keyboard'
                      selected="{currentMenu === 'changelog'}"
    />
</MenuHeader>
<MenuContainer>
    <div class="h-full w-full flex justify-center items-center">
        {#if currentMenu === 'version'}
            <VersionMenu/>
        {:else }
            <ChangelogMenu/>
        {/if}
    </div>
</MenuContainer>