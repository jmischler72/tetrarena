<script lang="ts">
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
		<h1>Waiting for players<span class="ani-ellipsis ani-ellipsis-jump"><span>.</span></span></h1>
	{/if}
</div>

<style lang="scss">
	.ani-ellipsis {
		&:before,
		&:after {
			content: '.';
		}
	}

	@keyframes jump-animation {
		0% {
			top: 0;
		}
		30% {
			top: -0.125em;
		}
		60% {
			top: 0;
		}
		100% {
			top: 0;
		}
	}

	.ani-ellipsis-jump {
		&:before {
			position: relative;
			animation: jump-animation 1s infinite;
			animation-delay: 0s;
		}

		span {
			position: relative;
			animation: jump-animation 1s infinite;
			animation-delay: 0.25s;
		}

		&:after {
			position: relative;
			animation: jump-animation 1s infinite;
			animation-delay: 0.5s;
		}
	}
</style>
