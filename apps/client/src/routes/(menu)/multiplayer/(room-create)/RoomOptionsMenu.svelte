<script lang="ts">
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import RoomOptionsForm from './RoomOptionsForm.svelte';
	import { type RoomOptions } from '@jmischler72/shared';
	import GameOptionsForm from './GameOptionsForm.svelte';

	export let optionsMenu: string;
	export let roomOptions: RoomOptions;

	function generateRandomIcons() {
		let randomString: string = (Math.random() + 1).toString(36).substring(2);

		let icons = [];

		for (let i = 0; i < 20; i++) {
			icons.push(randomString + i);
		}

		if (roomOptions.icon !== '') {
			icons[0] = roomOptions.icon;
		} else {
			roomOptions.icon = icons[0];
		}

		return icons;
	}

	let randomIcons: string[] = generateRandomIcons();
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
		{:else}
			<GameOptionsForm bind:roomOptions></GameOptionsForm>
		{/if}
	</div>
</div>
