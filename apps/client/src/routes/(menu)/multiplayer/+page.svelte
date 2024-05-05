<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import RoomsList from './RoomsList.svelte';
	import { roomStore } from '$lib/stores/MultiplayerStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import MenuRoomCreate from './MenuRoomCreate.svelte';
	import { onMount } from 'svelte';
	import { resetRoom } from '$lib/functions/services/RoomService';
	import { getUsername, initUser } from '$lib/functions/services/FirebaseService';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { auth } from '$lib/functions/services/FirebaseClient';

	let currentMenu = 'list';

	$: if ($roomStore && browser) goto('/multiplayer/' + $roomStore?.roomId);

	onMount(() => {
		resetRoom(false);
	});
</script>

<AsyncMenu callback={() => fetch(import.meta.env.VITE_SERVER_URL + '/version').then(() => initUser())}>
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
			{#if auth.currentUser}
				<MenuButtonHeader
					on:click={() => goto('/you')}
					text={getUsername()}
					icon="person"
					selected={false}
					customStyle="text-sm bg-gray-600/70"
				></MenuButtonHeader>
			{/if}
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
