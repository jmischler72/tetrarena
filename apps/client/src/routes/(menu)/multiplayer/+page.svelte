<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import RoomsList from './RoomsList.svelte';
	import { usernameStore } from '$lib/stores/MultiplayerStore';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import RoomCreate from './RoomCreate.svelte';
	import Leaderboard from './Leaderboard.svelte';
	import { goto } from '$app/navigation';

	let currentMenu = 'list';
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
			<MenuButtonHeader
				on:click={() => (currentMenu = 'leaderboard')}
				text="Leaderboard"
				icon="leaderboard"
				selected={currentMenu === 'leaderboard'}
			></MenuButtonHeader>
		</div>
		{#if $usernameStore}
			<MenuButtonHeader
				on:click={() => {
					goto('/you');
				}}
				text={$usernameStore}
				icon="person"
				selected={false}
				customStyle="text-sm bg-gray-600/70"
			></MenuButtonHeader>
		{/if}
	</div>
</MenuHeader>
{#if currentMenu === 'create'}
	<RoomCreate />
{:else if currentMenu === 'list'}
	<MenuContainer>
		<RoomsList></RoomsList>
	</MenuContainer>
{:else}
	<MenuContainer>
		<Leaderboard></Leaderboard>
	</MenuContainer>
{/if}
