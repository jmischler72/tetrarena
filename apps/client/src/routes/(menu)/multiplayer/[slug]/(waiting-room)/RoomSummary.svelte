<script lang="ts">
	import type { RoomOptions } from '@jmischler72/shared';
	import Button from '$lib/components/Button.svelte';
	import { roomStore } from '$lib/stores/MultiplayerStore';

	export let roomOptions: RoomOptions;
	export let showOptionsMenu: boolean;
</script>

<div class="relative flex h-full flex-col items-center justify-start rounded bg-gray-700 p-4">
	<div class="w-full overflow-y-scroll rounded bg-gray-800 p-4">
		<div class="flex w-full flex-col gap-6 rounded p-4">
			<h1 class="underline">Room</h1>
			<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
				<svg class="rounded bg-white" width="60" height="60" data-jdenticon-value={roomOptions.icon}></svg>
			</div>
			<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
				<h1>{roomOptions.name}</h1>
			</div>

			<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
				<h1>{roomOptions.gameMode.name}</h1>
			</div>
		</div>
		<div class="flex w-full flex-col gap-6 rounded p-4">
			<h1 class="underline">Game</h1>
			<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
				<h1>{roomOptions.gameMode.options.goalScore}</h1>
			</div>
		</div>
	</div>
	{#if $roomStore?.sessionId === $roomStore?.state.admin}
		<div class="absolute bottom-5 right-5">
			<Button onClick={() => (showOptionsMenu = true)}>
				<i class="material-symbols-outlined">tune</i>
			</Button>
		</div>
	{/if}
</div>
