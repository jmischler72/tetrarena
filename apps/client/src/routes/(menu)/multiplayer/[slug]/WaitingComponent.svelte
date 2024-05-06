<script lang="ts">
	import GameEndComponent from './(waiting-room)/GameEndComponent.svelte';
	import { roomStateStore, roomStore } from '$lib/stores/MultiplayerStore.js';
	import CurrentPlayers from './(waiting-room)/CurrentPlayers.svelte';
	import RoomSummary from './(waiting-room)/RoomSummary.svelte';

	export let showOptionsMenu: boolean;
</script>

<div class="flex h-full w-full flex-row justify-end">
	<div class="flex w-1/3 flex-col">
		{#if $roomStateStore?.winner !== ''}
			<GameEndComponent />
		{/if}
		<CurrentPlayers></CurrentPlayers>
	</div>
	<div class="w-1/3 rounded-lg p-8 pl-24">
		<RoomSummary bind:showOptionsMenu></RoomSummary>
	</div>
</div>
