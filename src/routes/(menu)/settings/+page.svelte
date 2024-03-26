<script>
    import MenuContainer from "$lib/components/menu-components/MenuContainer.svelte";
    import ControlsEditor from "./ControlsEditor.svelte";
    import MenuButtonHeader from "$lib/components/menu-components/MenuButtonHeader.svelte";
    import MenuHeader from "$lib/components/menu-components/MenuHeader.svelte";

    let currentMenu = 'controls';
</script>

<MenuContainer>
    <MenuHeader slot="header">
        <MenuButtonHeader on:click={()=> currentMenu = 'controls'}
                    menu="{{text: 'Controls', icon: 'keyboard', selected: currentMenu === 'controls'}}"></MenuButtonHeader>
    </MenuHeader>
    <ControlsEditor></ControlsEditor>
</MenuContainer>