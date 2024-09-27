<script lang="ts">
	import { ActionsEnum } from '@jmischler72/core';
	import { onMount } from 'svelte';
	import type { Preset } from '$lib/data/presets/preset';
	import { isKeyInPreset, setActionKey } from '$lib/functions/helpers/InputHelper';
	import { snackbarStore } from '$lib/stores/SnackbarStore';

	import Rotating from '$lib/icons/rotating.png';
	import Left from '$lib/icons/left.png';
	import Right from '$lib/icons/right.png';
	import Down from '$lib/icons/down.png';
	import HardDrop from '$lib/icons/hard_drop.png';

	export let tempKeybind: Preset;

	let actionWaitingForKey: ActionsEnum | null = null;

	let controls: [string, ActionsEnum, string][] = [
		['Move to the left', ActionsEnum.GO_LEFT, Left],
		['Move to the right', ActionsEnum.GO_RIGHT, Right],
		['Rotate', ActionsEnum.ROTATE, Rotating],
		['Soft Drop', ActionsEnum.GO_DOWN, Down],
		['Hard Drop', ActionsEnum.INSTANT_PLACE, HardDrop],
	];

	function handleKeyPress(event: KeyboardEvent) {
		if (!actionWaitingForKey) return;
		if (!isKeyInPreset(event.key, tempKeybind)) {
			tempKeybind = setActionKey(actionWaitingForKey, event.key, tempKeybind);
		} else {
			$snackbarStore = `Key <span class="font-bold underline">${event.key === ' ' ? 'SPACE' : event.key}</span> already in use !`;
		}
		actionWaitingForKey = null;
		event.preventDefault();
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	});
</script>

<div class="flex h-full w-full flex-col space-y-4 overflow-y-scroll p-6">
	{#each controls as control}
		<div class=" flex flex-row items-center justify-between rounded bg-gray-600/75 p-6 px-[5%] xl:mx-40 xl:px-[15%]">
			<img src={control[2]} alt={control[0]} class="w-28" />

			<button
				class="flex h-10 w-[40%] rounded-md border-2 border-gray-800 bg-gray-200 px-8 py-2 text-sm text-gray-800 focus-visible:outline-gray-400"
				on:click={() => (actionWaitingForKey = control[1])}
			>
				{#if actionWaitingForKey === control[1]}
					<span>Press a key...</span>
				{:else}
					{#if tempKeybind.keys[control[1]] === ' '}
						SPACE
					{/if}
					{tempKeybind.keys[control[1]].toUpperCase() || 'Not set'}
				{/if}
			</button>
		</div>
	{/each}
</div>
