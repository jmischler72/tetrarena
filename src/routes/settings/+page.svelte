<script>
    import MenuContainer from "../menu-components/MenuContainer.svelte";
    import ControlsEditor from "./ControlsEditor.svelte";
    import MenuHeader from "../menu-components/MenuHeader.svelte";

    let currentMenu = 'controls';
</script>

<MenuContainer>
    <div slot="header" class="w-full h-[10%] bg-gray-700/75 pl-10 items-center flex gap-6">
        <MenuHeader on:click={()=> currentMenu = 'controls'}
                    menu="{{text: 'Controls', icon: 'keyboard', selected: currentMenu === 'controls'}}"></MenuHeader>
    </div>
    <ControlsEditor></ControlsEditor>
</MenuContainer>