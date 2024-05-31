<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ThreePoints from '$lib/components/ThreePoints.svelte';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import { getUserInfos } from '$lib/functions/services/FirebaseService';
	import { joinRankedReservation } from '$lib/functions/services/RoomService';
	import { clientStore } from '$lib/stores/MultiplayerStore';
	import { snackbarStore } from '$lib/stores/SnackbarStore';
	import { GameModeEnum, MessageTypeEnum, type UserInfos } from '@jmischler72/shared';
	import type { Room } from 'colyseus.js';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let userInfos: UserInfos | null = null;
	let numberPlayersWaiting: number = 0;

	let queuing = false;
	let room: Room | null = null;

	async function joinRankedLobby() {
		try {
			room = await get(clientStore).joinOrCreate(GameModeEnum.RankedLobby);
			room.onMessage(MessageTypeEnum.PLAYERS_WAITING, (number) => {
				console.log(number);
				numberPlayersWaiting = number;
			});

			room.onMessage(MessageTypeEnum.RANKED_SEAT, (reservation) => {
				console.log(reservation);

				joinRankedReservation(reservation);
			});
		} catch (error: any) {
			snackbarStore.set(error.message);
			queuing = false;
		}
	}

	async function initialiseUserInfos() {
		userInfos = await getUserInfos();
	}

	onMount(() => {
		return () => {
			if (room) room.leave();
		};
	});
</script>

<MenuContainer>
	<div class="flex h-full w-full flex-col items-center justify-center gap-4">
		<AsyncMenu callback={() => initialiseUserInfos()}>
			{#if queuing}
				<AsyncMenu callback={() => joinRankedLobby()}>
					<div
						class="flex w-[70%] flex-row items-center justify-center gap-x-8 rounded-lg bg-gray-700/75 px-2 py-6 transition duration-500 ease-in-out"
					>
						<h1>Players currently in queue: {numberPlayersWaiting}</h1>
					</div>
					<div
						class="flex w-[70%] flex-row items-center justify-center gap-x-8 rounded-lg bg-gray-700/75 px-2 py-6 transition duration-500 ease-in-out"
					>
						<h1>Queuing<ThreePoints /></h1>
					</div>
				</AsyncMenu>
			{:else if userInfos}
				<div
					class="flex w-[70%] flex-row items-center justify-center gap-x-8 rounded-lg bg-gray-700/75 px-2 py-6 transition duration-500 ease-in-out"
				>
					<h1>{userInfos.username} - {userInfos.rank || 'unranked'}</h1>
				</div>
			{/if}
		</AsyncMenu>
	</div>
</MenuContainer>
<MenuFooter>
	<div class="h-[60%] w-[30%]">
		{#if !queuing}
			<Button
				onClick={() => {
					queuing = true;
				}}>Queue game</Button
			>
		{:else}
			<Button
				onClick={() => {
					queuing = false;
					room?.leave();
				}}>Cancel queuing</Button
			>{/if}
	</div>
</MenuFooter>
