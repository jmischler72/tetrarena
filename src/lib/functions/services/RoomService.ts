import {Room} from 'colyseus.js'
import {clientStore, roomStore} from '$lib/stores/multiplayerStore'
import {goto} from '$app/navigation'
import {get} from 'svelte/store'
import type {RoomCreateOptions} from '$lib/data/RoomCreateOptions'

// function addStateListener(room: Room<RoomState>) {
//     room.onMessage("pong", (message) => {
//         console.log("message received from server", message);
//         console.log(Date.now() - message.time);
//     });
//
//     room.state.players.onAdd((player, key) => {
//         console.log(key, "has been added to the room");
//         // add your player entity to the game world!
//         // If you want to track changes on a child object inside a map, this is a common pattern:
//         player.onChange(() => {
//             let gameStates = get(gameStatesStore);
//             gameStates.set(key, toGameStateDTO(player));
//         })
//     });
//
//     room.state.listen("isPlaying", (currentValue, previousValue) => {
//         if (currentValue === previousValue) return;
//         console.log("isPlaying changed", currentValue);
//         if (currentValue === true) $inGame = true;
//         isPlaying = currentValue;
//     });
// }

function addErrorHandling(room: Room) {
	room.onMessage('pong', (message) => {
		console.log('message received from server', message)
		console.log(Date.now() - message.time)
	})

	room.onError((code, message) => {
		console.log('oops, error ocurred:', code, message)
	})
	room.onLeave(() => {
		console.log('client left the room')
		roomStore.set(null)
		void goto('/multiplayer/')
	})
}

export async function joinRoom(roomId: string) {
	if (get(roomStore)) return
	try {
		const room: Room | undefined = await get(clientStore).joinById(roomId)
		if (room) {
			addErrorHandling(room)
			roomStore.set(room)
		}
	} catch (e) {
		console.error('join error', e)
	}
}

export async function createRoom(options: RoomCreateOptions) {
	if (options.name === '') options.name = 'New Room'

	try {
		const room: Room | undefined = await get(clientStore).create(
			'my_room',
			options
		)

		addErrorHandling(room)
		roomStore.set(room)
	} catch (e) {
		console.error('join error', e)
	}
}

export async function leaveRoom() {
	await get(roomStore)
		?.leave()
		.then((t: number) => {
			console.log('left room', t)
		})
}
