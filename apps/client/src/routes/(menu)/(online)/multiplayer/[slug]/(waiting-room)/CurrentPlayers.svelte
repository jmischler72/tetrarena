<script lang="ts">
	import ThreePoints from '$lib/components/ThreePoints.svelte';
	import { roomStateStore, roomStore } from '$lib/stores/MultiplayerStore';
	import type { PlayerState } from '@jmischler72/shared';

	$: players = $roomStateStore ? ($roomStateStore.players as Map<string, PlayerState>) : new Map<string, PlayerState>();
</script>

<div class="flex flex-col items-center justify-center gap-6 p-8">
	<div class="flex flex-col items-center justify-center">
		<ul class="list-none">
			{#each players as [key, player]}
				<li class="flex flex-row gap-2">
					<h1
						class="mb-2 rounded border-solid border-gray-400 bg-gray-600 p-2"
						class:border-2={key === $roomStore?.sessionId}
					>
						{player.username}
					</h1>
					{#if player.ready}
						<span class="mb-2 rounded border-solid border-gray-400 bg-gray-600 p-2 text-green-100">✔</span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
	{#if players.size < 2}
		<h1>Waiting for players<ThreePoints /></h1>
	{/if}
</div>
