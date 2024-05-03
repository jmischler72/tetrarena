<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { RoomOptions } from '@jmischler72/shared';
	import { createRoom } from '$lib/functions/services/room-service';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import RoomForm from './(room-create)/RoomForm.svelte';
	import { gameModes } from '@jmischler72/shared';

	let roomOptions: RoomOptions = {
		name: '',
		icon: '',
		gameMode: gameModes[0],
	};
	let creating = false;
</script>

<MenuContainer>
	{#if creating}
		<AsyncMenu callback={() => createRoom(roomOptions)}>
			<div class="flex h-full w-full justify-center">
				<span class="material-symbols-outlined"> check_circle </span>
			</div>
		</AsyncMenu>
	{:else}
		<RoomForm bind:roomOptions></RoomForm>
	{/if}
</MenuContainer>

<MenuFooter>
	<div class="h-[60%] w-[30%]">
		<Button onClick={() => (creating = true)}>Create the room</Button>
	</div>
</MenuFooter>
