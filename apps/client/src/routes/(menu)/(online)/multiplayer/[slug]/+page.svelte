<script lang="ts">
	import { joinRoom } from '$lib/functions/services/RoomService';
	import { roomStore } from '$lib/stores/MultiplayerStore';
	import MultiplayerTetris from './MultiplayerTetris.svelte';
	import WaitingRoom from './WaitingRoom.svelte';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';

	export let data;

	let isPlaying = false;

	$: $roomStore?.state.listen('isPlaying', (value) => {
		isPlaying = value;
		console.log('isPlaying', value);
	});
</script>

<svelte:window
	on:beforeunload={() => {
		if ($roomStore) localStorage.setItem('reconnectionToken', $roomStore.reconnectionToken);
	}}
/>

<AsyncMenu callback={() => joinRoom(data.slug)}>
	{#if isPlaying}
		<MultiplayerTetris></MultiplayerTetris>
	{:else}
		<WaitingRoom />
	{/if}
</AsyncMenu>
