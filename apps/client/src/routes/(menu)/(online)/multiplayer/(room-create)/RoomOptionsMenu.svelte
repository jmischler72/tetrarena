<script lang="ts">
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import RoomOptionsForm from './RoomOptionsForm.svelte';
	import { type RoomOptions } from '@jmischler72/shared';
	import FirstGameModeOptionsForm from './(game-options)/FirstGameModeOptionsForm.svelte';
	import { generateRandomIcons } from '$lib/functions/helpers/IconsHelper';

	export let optionsMenu: string;
	export let roomOptions: RoomOptions;

	let randomIcons: string[] = generateRandomIcons(roomOptions.icon);
	roomOptions.icon = randomIcons[0];
</script>

<div class="h-full w-full">
	<MenuHeader isSubmenu={true}>
		<MenuButtonHeader
			on:click={() => (optionsMenu = 'room')}
			text="Room Settings"
			icon="room_preferences"
			selected={optionsMenu === 'room'}
		/>
		<MenuButtonHeader
			on:click={() => (optionsMenu = 'game')}
			text="Gamemode Settings"
			icon="sports_esports"
			selected={optionsMenu === 'game'}
		/>
	</MenuHeader>
	<div class="h-[90%]">
		{#if optionsMenu === 'room'}
			<RoomOptionsForm on:gameOptions={() => (optionsMenu = 'game')} bind:roomOptions bind:randomIcons
			></RoomOptionsForm>
		{:else if roomOptions.gameOptions}
			<FirstGameModeOptionsForm bind:gameOptions={roomOptions.gameOptions}></FirstGameModeOptionsForm>
		{/if}
	</div>
</div>
