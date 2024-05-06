<script lang="ts">
	import { roomStateStore, roomStore } from '$lib/stores/MultiplayerStore';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import WaitingComponent from './WaitingComponent.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import Button from '$lib/components/Button.svelte';
	import { FirstGameModeRoomState, MessageTypeEnum, type RoomOptions } from '@jmischler72/shared';
	import RoomForm from '../(room-create)/RoomForm.svelte';

	let showOptionsMenu: boolean = false;
	let roomOptions: RoomOptions = {
		name: $roomStateStore?.name || '',
		icon: $roomStateStore?.icon || '',
		gameMode: {
			name: $roomStateStore?.gameMode as string,
			options: {
				goalScore: ($roomStateStore as FirstGameModeRoomState)?.goalScore,
			},
		},
	};
	let tempRoomOptions = structuredClone(roomOptions);

	function playerReady() {
		$roomStore?.send(MessageTypeEnum.READY);
	}

	$: isSaved = JSON.stringify(tempRoomOptions) === JSON.stringify(roomOptions);
</script>

<MenuHeader>
	<div class="relative left-0 right-0 z-0 ml-auto mr-auto flex w-full justify-center text-2xl">
		<h1>Room - {$roomStore?.roomId}</h1>
		{#if showOptionsMenu}
			<button
				class="group absolute left-12 flex cursor-pointer items-center"
				on:click={() => {
					showOptionsMenu = false;
					tempRoomOptions = structuredClone(roomOptions);
				}}
			>
				<span class="translate-x-[-2px] translate-y-[1px] opacity-40 transition group-hover:translate-x-[-6px]"
					>&#60;</span
				>back
			</button>
		{/if}
	</div>
</MenuHeader>
<MenuContainer hasFooter={true}>
	{#if showOptionsMenu}
		<RoomForm bind:roomOptions={tempRoomOptions}></RoomForm>
	{:else}
		<WaitingComponent bind:showOptionsMenu></WaitingComponent>
	{/if}
</MenuContainer>
<MenuFooter>
	<div class="w-[70%]">
		{#if !showOptionsMenu}
			<Button onClick={() => playerReady()} disabled={$roomStateStore?.players.get($roomStore?.sessionId || '')?.ready}>
				{#if $roomStateStore?.players.get($roomStore?.sessionId || '')?.ready}
					<span class="translate-x-[-5px] translate-y-[-4px] text-green-100">&#10004;</span> Ready
				{:else}
					Ready
				{/if}
			</Button>
		{:else}
			<Button
				onClick={() => {
					roomOptions = tempRoomOptions;
					$roomStore?.send(MessageTypeEnum.EDIT_ROOM, tempRoomOptions);
				}}
				disabled={isSaved}
			>
				{#if isSaved}
					<span class="translate-x-[-5px] translate-y-[-4px] text-green-100">&#10004;</span> Saved
				{:else}
					Save
				{/if}
			</Button>
		{/if}
	</div>
</MenuFooter>
