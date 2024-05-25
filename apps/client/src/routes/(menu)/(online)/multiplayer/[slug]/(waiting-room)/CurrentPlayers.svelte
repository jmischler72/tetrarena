<script lang="ts">
	import ThreePoints from '$lib/components/ThreePoints.svelte';
	import { roomStateStore, roomStore } from '$lib/stores/MultiplayerStore';
	import type { PlayerState } from '@jmischler72/shared';

	$: players = $roomStateStore ? ($roomStateStore.players as Map<string, PlayerState>) : new Map<string, PlayerState>();
</script>

<div class="flex flex-col items-center justify-center gap-6 p-8">
	<ul class="w-full list-none">
		{#each players as [key, player]}
			<li class="flex w-full flex-row gap-2">
				<div
					class="mb-2 flex w-full justify-between rounded border-solid border-gray-400 bg-gray-600 p-2"
					class:border-2={key === $roomStore?.sessionId}
				>
					<h1>
						{player.username}
					</h1>
					<h1 class=" whitespace-nowrap">
						{$roomStateStore?.winner ? '- ' + player.gameState.score : ''}
					</h1>
				</div>
				{#if $roomStateStore?.winner === player.username}
					<span class="mb-2 rounded border-solid border-gray-400 bg-gray-600 p-2 text-green-100">🏆</span>
				{/if}

				{#if player.ready}
					<span class="mb-2 rounded border-solid border-gray-400 bg-gray-600 p-2 text-green-100">✔</span>
				{/if}
			</li>
		{/each}
		{#if players.size < 2 && $roomStateStore?.isCompleted === false}
			<h1>Waiting for players<ThreePoints /></h1>
		{/if}
	</ul>
</div>
