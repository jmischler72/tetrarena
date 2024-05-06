import { Room } from 'colyseus.js';
import { clientStore, roomStore } from '$lib/stores/MultiplayerStore';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { MessageTypeEnum, type RoomOptions } from '@jmischler72/shared';
import { snackbarStore } from '$lib/stores/SnackbarStore';

export function resetRoom(goToMultiplayer = true) {
	roomStore.set(null);
	if (goToMultiplayer) void goto('/multiplayer/');
	localStorage.removeItem('reconnectionToken');
}

function handleRoom(room: Room) {
	roomStore.set(room);

	room.onMessage(MessageTypeEnum.PONG, (message) => {
		// console.log('message received from server', message);
		// console.log(Date.now() - message.time);
	});

	room.onError((code, message) => {
		console.log('oops, error ocurred:', code, message);
		snackbarStore.set('Oops, error ocurred !');
		resetRoom();
	});
	room.onLeave(() => {
		snackbarStore.set('You left the room !');

		if (!localStorage.getItem('reconnectionToken')) resetRoom();
	});
}

export async function joinRoom(roomId: string) {
	const reconnectionToken = localStorage.getItem('reconnectionToken');
	if (reconnectionToken) {
		await rejoinRoom(reconnectionToken);
		return;
	}

	if (get(roomStore)) return;

	try {
		let room = await get(clientStore).joinById(roomId);
		handleRoom(room);
	} catch (e) {
		snackbarStore.set('Error joining room !');
		console.debug('Join error : ' + e);
		resetRoom();
	}
}

async function rejoinRoom(reconnectionToken: string) {
	try {
		let room = await get(clientStore).reconnect(reconnectionToken);
		handleRoom(room);
		snackbarStore.set('Rejoined successfully !');

		localStorage.removeItem('reconnectionToken');
	} catch (e) {
		snackbarStore.set('Error rejoining room !');
		console.debug('Rejoin error : ' + e);
		resetRoom();
	}
}

export async function createRoom(options: RoomOptions) {
	if (options.name === '') options.name = 'New Room';
	// console.log(options);

	try {
		let room = await get(clientStore).create(options.gameMode.name, options);
		handleRoom(room);
		goto('/multiplayer/' + room.id);
	} catch (e) {
		snackbarStore.set('Error creating room !');
		console.error('Create error : ' + e);
		resetRoom();
	}
}

export async function leaveRoom() {
	await get(roomStore)?.leave(true);
	resetRoom();
}
