<script lang="ts">
    import RoomIconPicker from "./RoomIconPicker.svelte";
    import {clickOutside} from '$lib/functions/directives/clickOutside.js';
    import {createRoom} from "$lib/functions/services/RoomService";

    const ICON_SIZE = 200;

    let selectedIcon: number = 0;
    let randomString: string = (Math.random() + 1).toString(36).substring(2);

    let roomIcon = "";
    let roomName = "";

    let roomIconPickerOpen = false;

    $: roomIcon = randomString + selectedIcon;
    $: if (selectedIcon) {
        roomIconPickerOpen = false;
    }
    $: console.log(randomString + " , " + selectedIcon);

</script>

<div class="w-full h-full p-4 text-white">
    <!--    <div class="p-6 flex flex-row space-y-0 items-start gap-2">-->
    <!--        <div class="grid gap-1"><h3-->
    <!--                class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Add Room</h3>-->
    <!--            <p class="text-sm text-muted-foreground">Enter the details of the new room.</p></div>-->
    <!--    </div>-->
    <form class="w-full h-full flex flex-col justify-evenly px-16">
        <div class="flex h-[50%] flex-row gap-8 items-center justify-center">
            <div class="w-[30%] h-full relative flex justify-center items-center">
                <button on:click={()=>roomIconPickerOpen = true}>
                    <svg
                            class="bg-white" width="{ICON_SIZE}"
                            height="{ICON_SIZE}" data-jdenticon-value="{roomIcon}"></svg>
                </button>
                {#if roomIconPickerOpen}
                    <div class="absolute top-0 right-[-50px]" use:clickOutside
                         on:clickOutside={()=> roomIconPickerOpen = false}>
                        <RoomIconPicker bind:selectedIcon={selectedIcon}
                                        bind:randomString={randomString}></RoomIconPicker>
                    </div>
                {/if}
            </div>
            <div class="w-[40%] grid gap-4 md:gap-6">
                <div class="grid gap-2"><label
                        class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                        for="room-name">
                    Room Name
                </label><input
                        class="flex h-10 w-full text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="room-name" placeholder="New Room" type="text" bind:value={roomName}></div>
            </div>
        </div>

        <button
                on:click={() => createRoom(roomName || "New Room", roomIcon)}
                class="w-full mt-6 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border border-gray-500 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8">
            Add Room
        </button>
    </form>

</div>
