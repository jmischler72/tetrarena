import { Room } from 'colyseus.js';
import { clientStore, roomStore } from '$lib/stores/MultiplayerStore';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { MessageTypeEnum, type RoomOptions } from '@jmischler72/shared';
import { snackbarStore } from '$lib/stores/SnackbarStore';

export async function resetRoom(goToMultiplayer = true) {
	roomStore.set(null);
	if (goToMultiplayer) await goto('/multiplayer/');
	localStorage.removeItem('reconnectionToken');
}

function handleRoom(room: Room) {
	roomStore.set(room);

	room.onMessage(MessageTypeEnum.PONG, (message) => {
		// console.log('message received from server', message);
		// console.log(Date.now() - message.time);
	});

	room.onError((code, message) => {
		snackbarStore.set('Oops, error ocurred !');
		resetRoom();
	});
	room.onLeave(() => {
		snackbarStore.set('You left the room !');
		resetRoom();
	});
}

export async function joinRoom(roomId: string) {
	if (get(roomStore)?.roomId === roomId) return;

	const reconnectionToken = localStorage.getItem('reconnectionToken');
	if (reconnectionToken && reconnectionToken.split(':')[0] === roomId) {
		await rejoinRoom(reconnectionToken);
		return;
	}

	try {
		let room = await get(clientStore).joinById(roomId);
		handleRoom(room);
	} catch (e) {
		await resetRoom();

		snackbarStore.set('Error joining room !' + e);
	}

	localStorage.removeItem('reconnectionToken');
}

async function rejoinRoom(reconnectionToken: string) {
	try {
		let room = await get(clientStore).reconnect(reconnectionToken);
		handleRoom(room);
		snackbarStore.set('Rejoined successfully !');

		localStorage.removeItem('reconnectionToken');
	} catch (e) {
		await resetRoom();

		snackbarStore.set('Error rejoining room !' + e);
	}
}

export async function createRoom(options: RoomOptions) {
	if (options.name === '') options.name = 'New Room';

	try {
		let room = await get(clientStore).create(options.gameMode, options);
		handleRoom(room);
		await goto('/multiplayer/' + room.id);
	} catch (e) {
		await resetRoom();

		snackbarStore.set('Error creating room !' + e);
	}
}

export async function leaveRoom() {
	await get(roomStore)?.leave(true);
	await resetRoom();
}
