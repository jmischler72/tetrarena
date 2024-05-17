<script lang="ts">
	import type { FirstGameModeRoomState } from '@jmischler72/shared';
	import Button from '$lib/components/Button.svelte';
	import { roomStore, roomStateStore } from '$lib/stores/MultiplayerStore';
	import { goto } from '$app/navigation';

	$: roomState = $roomStateStore as FirstGameModeRoomState;
</script>

{#if roomState}
	<div
		class="relative flex h-full flex-col items-center justify-start rounded border-4 border-solid border-gray-600 p-4"
	>
		<div class="flex w-full flex-col gap-y-8 overflow-y-scroll">
			<div class="flex w-full flex-col gap-6 rounded bg-gray-800 p-4">
				<h1 class="underline">Room</h1>
				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<svg class="rounded bg-white" width="60" height="60" data-jdenticon-value={roomState.icon}></svg>
				</div>
				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<h1>{roomState.name}</h1>
				</div>

				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<h1>{roomState.gameMode}</h1>
				</div>
			</div>
			<div class="flex w-full flex-col gap-6 rounded bg-gray-800 p-4">
				<h1 class="underline">Game</h1>
				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<h1>{roomState.goalScore}</h1>
				</div>
				<div class=" flex w-full justify-center rounded bg-gray-700 py-4">
					<h1>{roomState.opponentAttacking}</h1>
				</div>
			</div>
		</div>
		{#if $roomStore?.sessionId === roomState.admin}
			<div class="absolute bottom-5 right-5">
				<Button onClick={() => goto(window.location.pathname + '/edit')}>
					<i class="material-symbols-outlined">tune</i>
				</Button>
			</div>
		{/if}
	</div>
{/if}
