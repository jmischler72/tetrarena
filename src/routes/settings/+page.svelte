<script>
    import MenuContainer from "../MenuContainer.svelte";
    import ControlsEditor from "./ControlsEditor.svelte";
</script>

<MenuContainer menus="{[
    {text: 'Controls', icon: 'keyboard', selected: true},
    {text: 'Create Room', icon: 'add_circle', selected: false},
    ]}">
    <ControlsEditor></ControlsEditor>
</MenuContainer>