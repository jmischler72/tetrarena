<script lang="ts">
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { auth, db } from '$lib/functions/services/FirebaseClient';
	import { initUser } from '$lib/functions/services/FirebaseService';
	import { userStore } from '$lib/stores/MultiplayerStore';
	import type { User } from '@jmischler72/shared';
	import { onValue, ref } from 'firebase/database';

	async function connectToServer() {
		await fetch(import.meta.env.VITE_SERVER_URL + '/version');
		await initUser();

		console.log(auth.currentUser);

		await onValue(ref(db, 'users/' + auth.currentUser?.uid), (snapshot) => {
			console.log(snapshot.val());
			if (snapshot.exists()) {
				$userStore = snapshot.val() as User;
			} else {
				$userStore = {
					username: 'Guest-' + auth.currentUser!.uid.substring(0, 6),
				};
			}
		});
	}
</script>

<AsyncMenu callback={() => connectToServer()}>
	<slot></slot>
</AsyncMenu>
