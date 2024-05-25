<script lang="ts">
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { joinRoom } from '$lib/functions/services/RoomService';
	import { roomStore } from '$lib/stores/MultiplayerStore';
	import { isRoomEditingStore } from '$lib/stores/NavigationStore';
	import { onMount } from 'svelte';
	import MultiplayerTetris from './MultiplayerTetris.svelte';
	import WaitingRoom from './WaitingRoom.svelte';
	import EditingRoom from './EditingRoom.svelte';

	export let data;

	let isPlaying = false;

	$: $roomStore?.state.listen('isPlaying', (value) => {
		isPlaying = value;
	});

	onMount(() => {
		return () => {
			if ($roomStore) localStorage.setItem('reconnectionToken', $roomStore.reconnectionToken);
		};
	});
</script>

<AsyncMenu callback={() => joinRoom(data.slug)}>
	{#if isPlaying}
		<MultiplayerTetris></MultiplayerTetris>
	{:else if $isRoomEditingStore}
		<EditingRoom />
	{:else}
		<WaitingRoom />
	{/if}
</AsyncMenu>
