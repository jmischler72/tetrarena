<script>
    import MenuContainer from "../MenuContainer.svelte";
</script>

<MenuContainer menus="{[
    {text: 'Controls', icon: 'keyboard', selected: true},
    {text: 'Create Room', icon: 'add_circle', selected: false},
    ]}">
    <h1>settings</h1>
</MenuContainer>