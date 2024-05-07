<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import RoomsList from './RoomsList.svelte';
	import { roomStore, usernameStore } from '$lib/stores/MultiplayerStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import MenuRoomCreate from './MenuRoomCreate.svelte';

	let currentMenu = 'list';

	$: if ($roomStore && browser) goto('/multiplayer/' + $roomStore?.roomId);
</script>

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
		{#if $usernameStore}
			<MenuButtonHeader
				on:click={() => {}}
				text={$usernameStore}
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
