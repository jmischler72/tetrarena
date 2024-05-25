<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import { roomStore, roomStateStore } from '$lib/stores/MultiplayerStore';
	import { GameModeEnum, MessageTypeEnum, zRoomOptions, type RoomOptions } from '@jmischler72/shared';
	import RoomOptionsMenu from '../(room-create)/RoomOptionsMenu.svelte';
	import { roomOptionsDescriptionStore } from '$lib/stores/RoomOptionsDescriptionStore';
	import { formatZodIssue } from '$lib/functions/helpers/ZodHelper';
	import { z } from 'zod';
	import { isRoomEditingStore } from '$lib/stores/NavigationStore';

	let optionsMenu = 'room';

	let loading = false;

	let roomOptions: RoomOptions = {
		name: $roomStateStore?.metadata.name || '',
		icon: $roomStateStore?.metadata.icon || '',
		gameMode: ($roomStateStore?.metadata.gameMode as GameModeEnum) || GameModeEnum.First,
		gameOptions: {
			goalScore: $roomStateStore?.metadata.goalScore || 10,
			opponentAttacking: $roomStateStore?.metadata.opponentAttacking || false,
		},
	};
	let tempRoomOptions = structuredClone(roomOptions);

	async function validateRoomOptions() {
		optionsMenu = 'room';
		loading = true;
		$roomOptionsDescriptionStore = '';
		try {
			zRoomOptions.parse(tempRoomOptions);
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

		$roomStore?.send(MessageTypeEnum.EDIT_ROOM, tempRoomOptions);

		roomOptions = tempRoomOptions;
		loading = false;
		$isRoomEditingStore = false;
	}

	$: isSaved = JSON.stringify(tempRoomOptions) === JSON.stringify(roomOptions);
</script>

<MenuHeader>
	<div class="relative left-0 right-0 z-0 ml-auto mr-auto flex w-full justify-center text-2xl">
		<h1>Room - {$roomStore?.roomId}</h1>
		<button
			class="group absolute left-12 flex cursor-pointer items-center"
			on:click={() => {
				$isRoomEditingStore = false;
				tempRoomOptions = structuredClone(roomOptions);
			}}
		>
			<span class="translate-x-[-2px] translate-y-[1px] opacity-40 transition group-hover:translate-x-[-6px]"
				>&#60;</span
			>back
		</button>
	</div>
</MenuHeader>
<MenuContainer hasFooter={true}>
	{#if loading}
		<div class="flex h-full w-full items-center justify-center">
			<LoadingSpinner />
		</div>
	{:else}
		<RoomOptionsMenu bind:roomOptions={tempRoomOptions} bind:optionsMenu></RoomOptionsMenu>
	{/if}
</MenuContainer>
<MenuFooter>
	<div class="w-[70%]">
		<Button
			onClick={() => {
				validateRoomOptions();
			}}
			disabled={isSaved}
		>
			{#if isSaved}
				<span class="translate-x-[-5px] translate-y-[-4px] text-green-100">&#10004;</span> Saved
			{:else}
				Save
			{/if}
		</Button>
	</div>
</MenuFooter>
