<script>
    import MenuContainer from "../MenuComponents/MenuContainer.svelte";
    import ControlsEditor from "./ControlsEditor.svelte";

</script>

<MenuContainer menus="{[
    {text: 'Controls', icon: 'keyboard', selected: true},
    ]}">
    <ControlsEditor ></ControlsEditor>
</MenuContainer>