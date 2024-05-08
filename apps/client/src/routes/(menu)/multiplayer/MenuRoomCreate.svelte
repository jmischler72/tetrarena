<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { RoomOptions } from '@jmischler72/shared';
	import { createRoom } from '$lib/functions/services/RoomService';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import RoomForm from './(room-create)/RoomForm.svelte';
	import { gameModes, zRoomOptions } from '@jmischler72/shared';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let roomOptions: RoomOptions = {
		name: '',
		icon: '',
		gameMode: gameModes[0],
	};

	let loading = false;

	async function validateRoomOptions() {
		loading = true;
		try {
			zRoomOptions.parse(roomOptions);
		} catch (e) {
			console.error(e);
			loading = false;
			roomOptions.gameMode.description = e.message;

			return false;
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
		<RoomForm bind:roomOptions></RoomForm>
	{/if}
</MenuContainer>

<MenuFooter>
	<div class="h-[60%] w-[30%]">
		<Button onClick={() => validateRoomOptions()}>Create the room</Button>
	</div>
</MenuFooter>
