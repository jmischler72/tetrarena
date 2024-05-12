<script lang="ts">
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { initUser } from '$lib/functions/services/FirebaseService';

	async function connectToServer() {
		await fetch(import.meta.env.VITE_SERVER_URL + '/version');
		await initUser();
	}
</script>

<AsyncMenu callback={() => connectToServer()}>
	<slot></slot>
</AsyncMenu>
