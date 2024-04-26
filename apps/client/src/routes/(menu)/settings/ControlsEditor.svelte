<script lang="ts">
	import {ActionsEnum} from '@jmischler72/core'
	import {onMount} from 'svelte'
	import type {Preset} from '$lib/data/presets/preset'
	import {isKeyInPreset, setActionKey} from '$lib/functions/helpers/InputHelper'
	import { snackbarStore } from '$lib/stores/snackbarStore';

	export let tempKeybind: Preset

	let actionWaitingForKey: ActionsEnum | null = null

	let controls: [string, ActionsEnum][] = [
		['Move to the left', ActionsEnum.GO_LEFT],
		['Move to the right', ActionsEnum.GO_RIGHT],
		['Rotate', ActionsEnum.ROTATE],
		['Soft Drop', ActionsEnum.GO_DOWN],
		['Hard Drop', ActionsEnum.INSTANT_PLACE],
	]

	function handleKeyPress(event: KeyboardEvent) {
		if (!actionWaitingForKey) return
		if (!isKeyInPreset(event.key, tempKeybind)) {
			tempKeybind = setActionKey(actionWaitingForKey, event.key, tempKeybind)
		}else{
			$snackbarStore = "Key already in use!";
		}
		actionWaitingForKey = null
		event.preventDefault()
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyPress)

		return () => {
			window.removeEventListener('keydown', handleKeyPress)
		}
	})
</script>

<div class="flex h-full w-full flex-col space-y-4 overflow-y-scroll p-6">
	{#each controls as control}
		<div class="mx-12 grid grid-cols-2 rounded bg-gray-700 p-6 px-[10%]">
			<h1
				class="flex items-center space-x-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				<span>{control[0]}</span>
			</h1>
			<button
				class="flex h-10 w-[50%] rounded-md border-2 border-gray-800 bg-gray-200 px-8 py-2 text-sm text-gray-800 focus-visible:outline-gray-400"
				on:click={() => (actionWaitingForKey = control[1])}>
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
