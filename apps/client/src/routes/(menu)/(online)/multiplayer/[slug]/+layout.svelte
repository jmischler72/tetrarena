<script lang="ts">
	import { joinRoom } from '$lib/functions/services/RoomService';
	import { roomStore } from '$lib/stores/MultiplayerStore';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		return () => {
			if ($roomStore) localStorage.setItem('reconnectionToken', $roomStore.reconnectionToken);
		};
	});
</script>

<AsyncMenu callback={() => joinRoom(data.slug)}>
	<slot />
</AsyncMenu>
