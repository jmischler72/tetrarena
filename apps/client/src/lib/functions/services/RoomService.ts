import { Room } from 'colyseus.js';
import { clientStore, playersStore, roomStore } from '$lib/stores/multiplayerStore';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import type { RoomCreateOptions } from '$lib/data/RoomCreateOptions';
import { MessageTypeEnum } from '@jmischler72/types';

function resetRoom() {
  roomStore.set(null);
  get(playersStore).clear();
  void goto('/multiplayer/');
  localStorage.removeItem('reconnectionToken');
}

function addErrorHandling(room: Room) {
  room.onMessage(MessageTypeEnum.PONG, (message) => {
    // console.log('message received from server', message);
    // console.log(Date.now() - message.time);
  });

  room.onError((code, message) => {
    console.log('oops, error ocurred:', code, message);
    resetRoom();
  });
  room.onLeave(() => {
    console.log('client left the room');
    if (get(roomStore)) localStorage.setItem('reconnectionToken', get(roomStore)!.reconnectionToken);
    roomStore.set(null);
  });
}

export async function joinRoom(roomId: string) {
  if (get(roomStore)) return;
  const reconnectionToken = localStorage.getItem('reconnectionToken');

  let room: Room | null = null;

  if (reconnectionToken) {
    try {
      room = await get(clientStore).reconnect(reconnectionToken);
      console.log('rejoined successfully', room);
      localStorage.removeItem('reconnectionToken');
    } catch (e) {
      console.error('rejoin error', e);
      resetRoom();
    }
  } else {
    try {
      room = await get(clientStore).joinById(roomId);
    } catch (e) {
      console.error('join error', e);
      resetRoom();
    }
  }

  if (room) {
    addErrorHandling(room);
    roomStore.set(room);
  }
}

export async function createRoom(options: RoomCreateOptions) {
  if (options.name === '') options.name = 'New Room';

  try {
    const room: Room | undefined = await get(clientStore).create('my_room', options);

    addErrorHandling(room);
    roomStore.set(room);
  } catch (e) {
    console.error('create error', e);
    resetRoom();
  }
}

export async function leaveRoom() {
  const room = get(roomStore);
  resetRoom();
  await room?.leave(true).then((t: number) => {
    console.log('left room', t);
  });
}
