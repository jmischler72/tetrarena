<script lang="ts">
	import { roomStateStore } from '$lib/stores/MultiplayerStore';
</script>

<div class="flex flex-col items-center justify-center gap-6 p-8">
	<h1>&#128081;</h1>
	<h1>Winner: {$roomStateStore?.winner}</h1>
	<h1>Scores:</h1>
	<ul>
		{#each $roomStateStore?.players ?? [] as [key, player]}
			<li>{player.username} - {player.gameState.score}</li>
		{/each}
	</ul>
</div>
