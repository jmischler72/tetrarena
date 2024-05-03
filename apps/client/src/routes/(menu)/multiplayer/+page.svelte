<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import RoomsList from './RoomsList.svelte';
	import { roomStore } from '$lib/stores/multiplayerStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import MenuRoomCreate from './MenuRoomCreate.svelte';
	import { onMount } from 'svelte';
	import { resetRoom } from '$lib/functions/services/RoomService';
	import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
	import { guestLogin } from '$lib/functions/services/FirebaseService';

	let currentMenu = 'list';

	$: if ($roomStore && browser) goto('/multiplayer/' + $roomStore?.roomId);

	const auth = getAuth();
	let currentUser: User | null = auth.currentUser;

	onMount(() => {
		resetRoom(false);

		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				currentUser = user;
			} else {
				// User is signed out
				// ...
			}
		});
	});
</script>

<AsyncMenu callback={() => guestLogin()}>
	<MenuHeader>
		<div class="flex h-full w-full flex-row justify-between">
			<div class="flex flex-row">
				<MenuButtonHeader
					on:click={() => (currentMenu = 'list')}
					text="Rooms List"
					icon="list"
					selected={currentMenu === 'list'}
				></MenuButtonHeader>
				<MenuButtonHeader
					on:click={() => (currentMenu = 'create')}
					text="Create Room"
					icon="add_circle"
					selected={currentMenu === 'create'}
				></MenuButtonHeader>
			</div>

			<MenuButtonHeader
				on:click={() => goto('/you')}
				text="Guest-{currentUser?.uid.substring(0, 6) || ''}"
				icon="person"
				selected={false}
				customStyle="text-sm bg-gray-600/70"
			></MenuButtonHeader>
		</div>
	</MenuHeader>
	{#if currentMenu === 'create'}
		<MenuRoomCreate />
	{:else}
		<MenuContainer>
			<RoomsList></RoomsList>
		</MenuContainer>
	{/if}
</AsyncMenu>
