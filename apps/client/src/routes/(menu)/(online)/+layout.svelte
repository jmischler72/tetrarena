<script lang="ts">
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { initUser } from '$lib/functions/services/FirebaseService';
	import { userStore } from '$lib/stores/MultiplayerStore';
	import { get } from 'svelte/store';

	async function connectToServer() {
		if (get(userStore)) return;
		await fetch(import.meta.env.VITE_SERVER_URL + '/version');
		await initUser();
	}
</script>

<AsyncMenu callback={() => connectToServer()}>
	<slot></slot>
</AsyncMenu>
