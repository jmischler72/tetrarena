<script lang="ts">
	import { browser } from '$app/environment';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { initUser } from '$lib/functions/services/FirebaseService';

	async function connectToServer() {
		if (!browser) {
			console.log('Server connection only available in browser');
			return;
		}
		await fetch(import.meta.env.VITE_SERVER_URL + '/healthcheck');
		await initUser();
		console.log('Connected to server');
	}
</script>

<AsyncMenu callback={() => connectToServer()}>
	<slot></slot>
</AsyncMenu>
