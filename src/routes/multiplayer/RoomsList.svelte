<script lang="ts">
    import {onMount} from "svelte";
    import type {RoomAvailable} from "colyseus.js";
    import {clientStore, roomStore} from "./multiplayerStore.js";
    import {Room} from "colyseus.js";
    import {RoomState} from "./[slug]/types/RoomState";
    import {joinRoom} from "./RoomService";

    let rooms: RoomAvailable[] = [];

    onMount(() => {
        $clientStore.getAvailableRooms("my_room").then((r) => {
            rooms = r;
        });

        let interval = setInterval(async () => {
            rooms = await $clientStore.getAvailableRooms("my_room")
        }, 5000);

        return () => clearInterval(interval);
    })
</script>

<div class="w-full  text-white p-4 overflow-scroll">
    <table class="w-full caption-bottom text-sm ">
        <thead class="[&amp;_tr]:border-b bg-gray-700">
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 ">
                Lobby Avatar
            </th>
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 ">
                Lobby Name
            </th>
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Lobby ID
            </th>
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Players
            </th>
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Status
            </th>
            <th class="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right w-[100px]">
                Actions
            </th>
        </tr>
        </thead>
        <tbody class="[&amp;_tr:last-child]:border-0 ">
        <!--{#each {length: 10} as _, i}-->

        <!--<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">-->
        <!--    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">test</td>-->
        <!--    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">test</td>-->
        <!--    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">test</td>-->
        <!--    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">Active</td>-->
        <!--    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 flex justify-end gap-2">-->
        <!--        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8">-->
        <!--            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
        <!--                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"-->
        <!--                 class="h-4 w-4">-->
        <!--                <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path>-->
        <!--                <polyline points="14 2 14 8 20 8"></polyline>-->
        <!--                <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>-->
        <!--            </svg>-->
        <!--            <span class="sr-only">Edit</span></button>-->
        <!--        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8">-->
        <!--            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
        <!--                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"-->
        <!--                 class="h-4 w-4">-->
        <!--                <path d="M3 6h18"></path>-->
        <!--                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>-->
        <!--                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>-->
        <!--            </svg>-->
        <!--            <span class="sr-only">Delete</span></button>-->
        <!--    </td>-->
        <!--</tr>-->
        <!--    {/each}-->
        {#each rooms as room}
            <tr on:click={() => joinRoom(room.roomId)}
                class="border-b transition-colors cursor-pointer hover:bg-gray-600 ">
                <td class="p-4 align-middle justify-center flex [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    <svg
                            class="bg-white" width="60"
                            height="60" data-jdenticon-value="{room.metadata?.roomIcon}"></svg></td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">{room.metadata?.roomName}</td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{room.roomId}</td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{room.clients}</td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">Active</td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 flex justify-end gap-2">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="h-4 w-4">
                            <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>
                        </svg>
                        <span class="sr-only">Edit</span></button>
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="h-4 w-4">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                        <span class="sr-only">Delete</span></button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>