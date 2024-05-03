<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import ControlsEditor from './ControlsEditor.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { Preset } from '$lib/data/presets/preset.js';
	import { keybindStore } from '$lib/stores/controls-store';

	let currentMenu = 'controls';

	let tempKeybind: Preset = structuredClone($keybindStore);

	function saveKeybinds() {
		$keybindStore = structuredClone(tempKeybind);
	}

	$: isSaved = JSON.stringify($keybindStore) === JSON.stringify(tempKeybind);
</script>

<MenuHeader>
	<MenuButtonHeader
		on:click={() => (currentMenu = 'controls')}
		text="Controls"
		icon="keyboard"
		selected={currentMenu === 'controls'}
	></MenuButtonHeader>
</MenuHeader>
<MenuContainer hasFooter={true}>
	<ControlsEditor bind:tempKeybind></ControlsEditor>
</MenuContainer>

<MenuFooter>
	<div class="h-[60%] w-[30%]">
		<Button onClick={() => saveKeybinds()} disabled={isSaved}>
			{#if isSaved}
				<span class="translate-x-[-5px] translate-y-[-4px] text-green-100">&#10004;</span> Saved
			{:else}
				Save
			{/if}
		</Button>
	</div>
</MenuFooter>
