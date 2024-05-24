<script lang="ts">
	import type { RoomAvailable, Room } from 'colyseus.js';
	import { clientStore } from '$lib/stores/MultiplayerStore';
	import { goto } from '$app/navigation';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { GameModeEnum, getDefaultGameMode } from '@jmischler72/shared';

	// function fillWithTestRooms() {
	//   for (let i = 0; i < 10; i++) {
	//     allRooms.push({
	//       maxClients: 0,
	//       name: 'Test Room',
	//       roomId: 'room_' + i,
	//       clients: i,
	//       metadata: {
	//         name: 'Room ' + i,
	//         icon: i,
	//         gameMode: 'FFA'
	//       }
	//     });
	//   }
	// }

	let allRooms: RoomAvailable[] = [];

	async function connectToLobbyRoom() {
		let lobby = await $clientStore.joinOrCreate('lobby', { filter: { name: GameModeEnum.First } });
		onJoin(lobby);
	}

	function onJoin(lobby: Room) {
		lobby.onError(() => {
			console.log('Error');
			connectToLobbyRoom();
		});

		lobby.onLeave(() => {
			console.log('Leave');
			connectToLobbyRoom();
		});

		lobby.onMessage('rooms', (rooms) => {
			allRooms = [...rooms];
		});

		lobby.onMessage('+', ([roomId, room]) => {
			const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
			if (roomIndex !== -1) {
				allRooms[roomIndex] = room;
			} else {
				allRooms.push(room);
				allRooms = allRooms; //svelte things
			}
		});

		lobby.onMessage('-', (roomId) => {
			allRooms = allRooms.filter((room) => room.roomId !== roomId);
		});
	}
</script>

<AsyncMenu callback={() => connectToLobbyRoom()}>
	<div class="h-full w-full p-4 text-white">
		<div class="h-full overflow-y-scroll rounded border-2 border-solid border-gray-600">
			<table class="w-full caption-bottom pl-10 text-sm">
				<thead class="[&amp;_tr]:border-b bg-gray-700">
					<tr class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
						<th
							class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-center align-middle font-medium"
						>
							Lobby Avatar
						</th>
						<th
							class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-center align-middle font-medium"
						>
							Lobby Name
						</th>
						<th
							class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-center align-middle font-medium"
						>
							Lobby ID
						</th>
						<th
							class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-center align-middle font-medium"
						>
							Players
						</th>
						<th
							class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-center align-middle font-medium"
						>
							Game Mode
						</th>
					</tr>
				</thead>
				<tbody class="[&amp;_tr:last-child]:border-0">
					{#each allRooms as room}
						<tr
							on:click={() => goto('/multiplayer/' + room.roomId)}
							class="cursor-pointer border-b transition-colors hover:bg-gray-600"
						>
							<td class="[&amp;:has([role=checkbox])]:pr-0 flex justify-center p-4 align-middle font-medium">
								<svg class="rounded bg-white" width="60" height="60" data-jdenticon-value={room?.metadata.icon}></svg>
							</td>
							<td class="[&amp;:has([role=checkbox])]:pr-0 p-4 text-center align-middle font-medium"
								>{room?.metadata.name}</td
							>
							<td class="[&amp;:has([role=checkbox])]:pr-0 p-4 text-center align-middle">{room.roomId}</td>
							<td class="[&amp;:has([role=checkbox])]:pr-0 p-4 text-center align-middle">{room.clients}</td>
							<td class="[&amp;:has([role=checkbox])]:pr-0 p-4 text-center align-middle"
								>{getDefaultGameMode(room?.metadata.gameMode).name}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</AsyncMenu>
