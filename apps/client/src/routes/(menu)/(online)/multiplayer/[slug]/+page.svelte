<script lang="ts">
	import { roomStore } from '$lib/stores/MultiplayerStore';
	import MultiplayerTetris from './MultiplayerTetris.svelte';
	import WaitingRoom from './WaitingRoom.svelte';

	let isPlaying = false;

	$: $roomStore?.state.listen('isPlaying', (value) => {
		isPlaying = value;
	});
</script>

{#if isPlaying}
	<MultiplayerTetris></MultiplayerTetris>
{:else}
	<WaitingRoom />
{/if}
