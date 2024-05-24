<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { roomStore, roomStateStore } from '$lib/stores/MultiplayerStore';
	import { isRoomEditingStore } from '$lib/stores/NavigationStore';

	$: metadata = $roomStateStore?.metadata;
</script>

{#if metadata}
	<div
		class="relative flex h-full flex-col items-center justify-start rounded border-4 border-solid border-gray-600 p-4"
	>
		<div class="flex w-full flex-col gap-y-8 overflow-y-scroll">
			<div class="flex w-full flex-col gap-6 rounded bg-gray-800 p-4">
				<h1 class="underline">Room</h1>
				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<svg class="rounded bg-white" width="60" height="60" data-jdenticon-value={metadata.icon}></svg>
				</div>
				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<h1>{metadata.name}</h1>
				</div>

				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<h1>{metadata.gameMode}</h1>
				</div>
			</div>
			<div class="flex w-full flex-col gap-6 rounded bg-gray-800 p-4">
				<h1 class="underline">Game</h1>
				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<h1>{metadata.goalScore}</h1>
				</div>
				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<h1>{metadata.opponentAttacking}</h1>
				</div>
			</div>
		</div>
		{#if $roomStore?.sessionId === $roomStateStore?.admin}
			<div class="absolute bottom-5 right-5">
				<Button onClick={() => ($isRoomEditingStore = true)}>
					<i class="material-symbols-outlined">tune</i>
				</Button>
			</div>
		{/if}
	</div>
{/if}
