<script lang="ts">
	import RoomIconPicker from './RoomIconPicker.svelte';
	import { clickOutside } from '$lib/functions/directives/ClickOutside';
	import Button from '$lib/components/Button.svelte';
	import GameModePicker from './GameModePicker.svelte';
	import { getDefaultGameMode, type RoomOptions } from '@jmischler72/shared';
	import { createEventDispatcher } from 'svelte';
	import { roomOptionsDescriptionStore } from '$lib/stores/RoomOptionsDescriptionStore';

	const dispatch = createEventDispatcher();

	const ICON_SIZE = 200;
	export let roomOptions: RoomOptions;
	export let randomIcons: string[];

	let roomIconPickerOpen = false;
	let gameModePickerOpen = false;
</script>

<div class="animation-up relative flex h-full w-full items-center justify-center">
	{#if roomIconPickerOpen}
		<div
			class="absolute left-10 flex h-[80%] w-[12%] justify-center overflow-y-scroll rounded-lg bg-gray-600/50 py-4"
			use:clickOutside
			on:clickOutside={() => (roomIconPickerOpen = false)}
		>
			<RoomIconPicker bind:icon={roomOptions.icon} bind:randomIcons bind:roomIconPickerOpen></RoomIconPicker>
		</div>
	{/if}

	{#if gameModePickerOpen}
		<div
			class="absolute right-10 flex h-[80%] w-[12%] justify-center overflow-y-scroll rounded-lg bg-gray-600/50 py-4"
			use:clickOutside
			on:clickOutside={() => (gameModePickerOpen = false)}
		>
			<GameModePicker bind:gameModePickerOpen bind:gameMode={roomOptions.gameMode}></GameModePicker>
		</div>
	{/if}

	{#if $roomOptionsDescriptionStore}
		<div
			class="absolute bottom-10 mx-6 flex h-[15%] w-[70%] items-center justify-center rounded-lg bg-gray-600/50 transition duration-500 ease-in-out"
			class:translate-x-[7%]={roomIconPickerOpen}
			class:translate-x-[-7%]={gameModePickerOpen}
		>
			<h1>{$roomOptionsDescriptionStore}</h1>
		</div>
	{/if}

	<div
		class="flex w-[70%] flex-row items-center justify-center gap-x-8 rounded-lg bg-gray-700/75 px-2 py-6 transition duration-500 ease-in-out"
		class:translate-x-[7%]={roomIconPickerOpen}
		class:translate-x-[-7%]={gameModePickerOpen}
		class:translate-y-[-7%]={$roomOptionsDescriptionStore}
	>
		<div class="flex h-full items-center justify-center">
			<button on:click={() => (roomIconPickerOpen = true)}>
				<svg class="rounded bg-white" width={ICON_SIZE} height={ICON_SIZE} data-jdenticon-value={roomOptions.icon}
				></svg>
			</button>
		</div>
		<div class="grid w-[70%] gap-4 px-4 md:gap-6">
			<div class="grid gap-2">
				<label class="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="room-name">
					Room Name
				</label><input
					class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-center text-black file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					id="room-name"
					placeholder="New Room"
					type="text"
					bind:value={roomOptions.name}
				/>
			</div>
			<div class="grid gap-2">
				<label class="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="room-name">
					Game Mode
				</label>
				<div class="flex w-full flex-row gap-4">
					<div class="w-full">
						<Button onClick={() => (gameModePickerOpen = true)}>
							{getDefaultGameMode(roomOptions.gameMode).name}
						</Button>
					</div>
					<div class="w-auto">
						<Button onClick={() => dispatch('gameOptions')}>
							<i class="material-symbols-outlined">tune</i>
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
