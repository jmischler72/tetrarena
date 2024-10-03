<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import RoomsList from './RoomsList.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import RoomCreate from './RoomCreate.svelte';
	import Leaderboard from './Leaderboard.svelte';
	import RankedComponent from './RankedComponent.svelte';
	import { goto } from '$app/navigation';
	import { getUserInfos } from '$lib/functions/services/FirebaseService';

	let currentMenu = 'play';
</script>

<MenuHeader>
	<div class="flex h-full w-full flex-row items-center justify-between">
		<div class="flex h-full flex-row">
			<MenuButtonHeader
				on:click={() => (currentMenu = 'play')}
				text="Play"
				icon="play_arrow"
				selected={currentMenu === 'play'}
			></MenuButtonHeader>
			{#if currentMenu === 'list' || currentMenu === 'create'}
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
			{:else}
				<MenuButtonHeader
					on:click={() => (currentMenu = 'list')}
					text="Rooms"
					icon="list"
					selected={currentMenu === 'list'}
				></MenuButtonHeader>
			{/if}

			<MenuButtonHeader
				on:click={() => (currentMenu = 'leaderboard')}
				text="Leaderboard"
				icon="leaderboard"
				selected={currentMenu === 'leaderboard'}
			></MenuButtonHeader>
		</div>

		<!-- <h1>{currentMenu}</h1> -->
		{#await getUserInfos() then infos}
			{#if infos}
				<MenuButtonHeader
					on:click={() => {
						goto('/you');
					}}
					text={infos.username}
					icon="person"
					selected={false}
					customStyle="!text-sm bg-gray-600/70"
				></MenuButtonHeader>
			{/if}
		{/await}
	</div>
</MenuHeader>
{#if currentMenu === 'create'}
	<RoomCreate />
{:else if currentMenu === 'list'}
	<MenuContainer>
		<RoomsList></RoomsList>
	</MenuContainer>
{:else if currentMenu === 'play'}
	<RankedComponent></RankedComponent>
{:else}
	<MenuContainer>
		<Leaderboard></Leaderboard>
	</MenuContainer>
{/if}
