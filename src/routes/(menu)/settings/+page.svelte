<script lang="ts">
    import MenuContainer from "$lib/components/menu/MenuContainer.svelte";
    import ControlsEditor from "./ControlsEditor.svelte";
    import MenuButtonHeader from "$lib/components/menu/MenuButtonHeader.svelte";
    import MenuHeader from "$lib/components/menu/MenuHeader.svelte";
    import MenuFooter from "$lib/components/menu/MenuFooter.svelte";
    import Button from "$lib/components/Button.svelte";
    import type {Preset} from "$lib/data/presets/preset.js";
    import {keybindStore} from "$lib/stores/controlsStore.js";

    let currentMenu = 'controls';

    let tempKeybind: Preset = structuredClone($keybindStore);

    function saveKeybinds() {
        console.log("saved");
        $keybindStore = structuredClone(tempKeybind);
    }

    $: isSaved = JSON.stringify($keybindStore) === JSON.stringify(tempKeybind);
</script>

<MenuContainer>
    <MenuHeader slot="header">
        <MenuButtonHeader on:click={()=> currentMenu = 'controls'}
                          button="{{text: 'Controls', icon: 'keyboard', selected: currentMenu === 'controls'}}"></MenuButtonHeader>
    </MenuHeader>
    <ControlsEditor bind:tempKeybind={tempKeybind}></ControlsEditor>

    <MenuFooter slot="footer">
        <div class="w-[70%]">
            <Button onClick={()=>saveKeybinds()}
                    disabled="{ isSaved }"
            >
                {#if isSaved}
                    <span class="translate-y-[-4px] translate-x-[-5px] text-green-100">&#10004;</span> Saved
                {:else}
                    Save
                {/if}
            </Button>
        </div>
    </MenuFooter>
</MenuContainer>