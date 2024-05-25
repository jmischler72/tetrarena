<script lang="ts">
	import { browser } from '$app/environment';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { initUser } from '$lib/functions/services/FirebaseService';
	import { userStore } from '$lib/stores/MultiplayerStore';
	import { get } from 'svelte/store';

	async function connectToServer() {
		if (!browser) {
			console.log('Server connection only available in browser');
			return;
		}
		if (get(userStore)) return;
		await fetch(import.meta.env.VITE_SERVER_URL + '/version');
		await initUser();
	}
</script>

<AsyncMenu callback={() => connectToServer()}>
	<slot></slot>
</AsyncMenu>
