import { Room } from 'colyseus.js';
import { clientStore, roomStore } from '$lib/stores/multiplayerStore';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { MessageTypeEnum, type RoomOptions } from '@jmischler72/shared';
import { snackbarStore } from '$lib/stores/snackbarStore';

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
		snackbarStore.set('Oops, error ocurred!');
		resetRoom();
	});
	room.onLeave(() => {
		snackbarStore.set('Client left the room!');

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
		await get(clientStore)
			.joinById(roomId)
			.then((room) => handleRoom(room));
	} catch (e) {
		snackbarStore.set('Join Error!' + e);
		resetRoom();
	}
}

async function rejoinRoom(reconnectionToken: string) {
	try {
		await get(clientStore)
			.reconnect(reconnectionToken)
			.then((room) => handleRoom(room));
		snackbarStore.set('Rejoined successfully!');

		localStorage.removeItem('reconnectionToken');
	} catch (e) {
		snackbarStore.set('Rejoin Error!' + e);

		resetRoom();
	}
}

export async function createRoom(options: RoomOptions) {
	if (options.name === '') options.name = 'New Room';
	console.log(options);

	try {
		await get(clientStore)
			.create(options.gameMode.name, options)
			.then((room) => handleRoom(room));
	} catch (e) {
		snackbarStore.set('Create Error!' + e);
		resetRoom();
	}
}

export async function leaveRoom() {
	await get(roomStore)
		?.leave(true)
		.then(() => {
			resetRoom();
		});
}
