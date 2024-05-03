<script lang="ts">
	import GameEndComponent from './(waiting-room)/GameEndComponent.svelte';
	import { roomStore } from '$lib/stores/multiplayer-store';
	import CurrentPlayers from './(waiting-room)/CurrentPlayers.svelte';
	import RoomSummary from './(waiting-room)/RoomSummary.svelte';
	import type { RoomOptions } from '@jmischler72/shared';

	export let players: Map<string, boolean>;
	export let roomOptions: RoomOptions;
	export let showOptionsMenu: boolean;
	let winner: string = '';

	$roomStore?.state.listen('winner', (currentValue) => {
		winner = currentValue;
	});
</script>

<div class="flex h-full w-full flex-row justify-end">
	<div class="flex w-1/3 flex-col">
		{#if winner !== ''}
			<GameEndComponent {winner} />
		{/if}
		<CurrentPlayers bind:players></CurrentPlayers>
	</div>
	<div class="w-1/3 rounded-lg p-8 pl-24">
		<RoomSummary bind:roomOptions bind:showOptionsMenu></RoomSummary>
	</div>
</div>
