<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { RoomOptions } from '@jmischler72/shared';
	import { createRoom } from '$lib/functions/services/RoomService';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import RoomOptionsMenu from './(room-create)/RoomOptionsMenu.svelte';
	import { getDefaultGameMode, zRoomOptions } from '@jmischler72/shared';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { GameModeEnum } from '@jmischler72/shared';
	import { roomOptionsDescriptionStore } from '$lib/stores/RoomOptionsDescriptionStore';
	import { z } from 'zod';
	import { formatZodIssue } from '$lib/functions/helpers/ZodHelper';

	let optionsMenu = 'room';

	let roomOptions: RoomOptions = {
		name: '',
		icon: '',
		gameMode: GameModeEnum.First,
		gameOptions: getDefaultGameMode(GameModeEnum.First).options,
	};

	let loading = false;

	async function validateRoomOptions() {
		optionsMenu = 'room';
		loading = true;
		$roomOptionsDescriptionStore = '';
		try {
			if (!roomOptions.name) roomOptions.name = 'New Room';
			zRoomOptions.parse(roomOptions);
		} catch (e) {
			console.error(e);
			loading = false;
			if (e instanceof z.ZodError) {
				$roomOptionsDescriptionStore = formatZodIssue(e.errors[0]);
				setTimeout(() => {
					if ($roomOptionsDescriptionStore === formatZodIssue(e.errors[0])) roomOptionsDescriptionStore.set('');
				}, 10000);
			}

			return;
		}
		await createRoom(roomOptions);
		loading = false;
	}
</script>

<MenuContainer>
	{#if loading}
		<div class="flex h-full w-full items-center justify-center">
			<LoadingSpinner />
		</div>
	{:else}
		<RoomOptionsMenu bind:roomOptions bind:optionsMenu></RoomOptionsMenu>
	{/if}
</MenuContainer>

<MenuFooter>
	<div class="h-[60%] w-[30%]">
		<Button onClick={() => validateRoomOptions()}>Create the room</Button>
	</div>
</MenuFooter>
