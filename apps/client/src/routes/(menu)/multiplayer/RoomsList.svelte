<script lang='ts'>
  import type { RoomAvailable, Room } from 'colyseus.js';
  import { clientStore } from '$lib/stores/multiplayerStore';
  import { goto } from '$app/navigation';
  import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';


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

  function onJoin(lobby: Room) {
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

<AsyncMenu callback="{()=>$clientStore.joinOrCreate('lobby').then((lobby) =>onJoin(lobby))}">
  <div class='h-full w-full text-white p-4'>
    <div class='h-full border-solid border-2 border-gray-600 rounded overflow-y-scroll'>
      <table class='pl-10 w-full caption-bottom text-sm '>
        <thead class='[&amp;_tr]:border-b bg-gray-700'>
        <tr class='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
          <th
            class='h-12 px-4 text-center align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 '>
            Lobby Avatar
          </th>
          <th
            class='h-12 px-4 text-center align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 '>
            Lobby Name
          </th>
          <th
            class='h-12 px-4 text-center align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0'>
            Lobby ID
          </th>
          <th
            class='h-12 px-4 text-center align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0'>
            Players
          </th>
          <th
            class='h-12 px-4 text-center align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0'>
            Game Mode
          </th>
        </tr>
        </thead>
        <tbody class='[&amp;_tr:last-child]:border-0 '>
        {#each allRooms as room}
          <tr on:click={() => goto('/multiplayer/' + room.roomId)}
              class='border-b transition-colors cursor-pointer hover:bg-gray-600 '>
            <td class='p-4 flex justify-center align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium'>
              <svg
                class='bg-white rounded' width='60'
                height='60' data-jdenticon-value='{room.metadata.icon}'></svg>
            </td>
            <td
              class='p-4 text-center align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium'>{room.metadata.name}</td>
            <td class='p-4 text-center align-middle [&amp;:has([role=checkbox])]:pr-0'>{room.roomId}</td>
            <td class='p-4 text-center align-middle [&amp;:has([role=checkbox])]:pr-0'>{room.clients}</td>
            <td class='p-4 text-center align-middle [&amp;:has([role=checkbox])]:pr-0'>{room.metadata.gameMode.name}</td>
          </tr>
        {/each}
        </tbody>
      </table>
    </div>
  </div>
</AsyncMenu>