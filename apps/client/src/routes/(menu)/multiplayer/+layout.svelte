<script lang="ts">
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { getUsername, initUser } from '$lib/functions/services/FirebaseService';
	import { usernameStore } from '$lib/stores/MultiplayerStore';

	async function connectToServer() {
		await fetch(import.meta.env.VITE_SERVER_URL + '/version');
		await initUser();
		$usernameStore = await getUsername();
	}
</script>

<AsyncMenu callback={() => connectToServer()}>
	<slot></slot>
</AsyncMenu>
