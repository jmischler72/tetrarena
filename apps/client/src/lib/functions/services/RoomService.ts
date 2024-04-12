import { Room } from 'colyseus.js';
import { clientStore, playersStore, roomStore } from '$lib/stores/multiplayerStore';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import type { RoomCreateOptions } from '$lib/data/RoomCreateOptions';
import { MessageTypeEnum } from '@jmischler72/types';
import { errorStore } from '$lib/stores/multiplayerStore';

function resetRoom() {
  roomStore.set(null);
  get(playersStore).clear();
  void goto('/multiplayer/');
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
    errorStore.set(message || '');
    resetRoom();
  });
  room.onLeave(() => {
    console.log('client left the room');
    errorStore.set('client left the room');

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
    console.error('join error', e);
    resetRoom();
  }
}

async function rejoinRoom(reconnectionToken: string) {
  try {
    await get(clientStore)
      .reconnect(reconnectionToken)
      .then((room) => handleRoom(room));
    console.log('rejoined successfully');
    localStorage.removeItem('reconnectionToken');
  } catch (e) {
    console.error('rejoin error', e);
    resetRoom();
  }
}
export async function createRoom(options: RoomCreateOptions) {
  if (options.name === '') options.name = 'New Room';

  try {
    await get(clientStore)
      .create('my_room', options)
      .then((room) => handleRoom(room));
  } catch (e) {
    console.error('create error', e);
    resetRoom();
  }
}

export async function leaveRoom() {
  await get(roomStore)
    ?.leave(true)
    .then((t: number) => {
      console.log('left room', t);
      resetRoom();
    });
}
