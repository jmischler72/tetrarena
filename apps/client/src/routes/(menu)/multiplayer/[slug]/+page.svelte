<script lang="ts">
	import { joinRoom } from '$lib/functions/services/RoomService';
	import { roomStore, roomStateStore } from '$lib/stores/MultiplayerStore';
	import MultiplayerTetris from './MultiplayerTetris.svelte';
	import WaitingRoom from './WaitingRoom.svelte';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';

	export let data;
</script>

<svelte:window
	on:beforeunload={() => {
		if ($roomStore) localStorage.setItem('reconnectionToken', $roomStore.reconnectionToken);
	}}
/>

<AsyncMenu callback={() => joinRoom(data.slug)}>
	{#if $roomStateStore?.isPlaying}
		<MultiplayerTetris></MultiplayerTetris>
	{:else}
		<WaitingRoom />
	{/if}
</AsyncMenu>
