<script lang='ts'>
  import RoomIconPicker from './RoomIconPicker.svelte';
  import { clickOutside } from '$lib/functions/directives/clickOutside.js';
  import Button from '$lib/components/Button.svelte';
  import GameModePicker from './GameModePicker.svelte';
  import type { RoomCreateOptions } from '$lib/data/RoomCreateOptions';

  const ICON_SIZE = 200;

  let selectedIcon: number = 0;
  let randomString: string = (Math.random() + 1).toString(36).substring(2);

  export let roomCreateOptions: RoomCreateOptions = {
    name: '',
    icon: '',
    gameMode: 'First'
  };

  let description: string = '';
  let roomIconPickerOpen = false;
  let gameModePickerOpen = false;

  $: roomCreateOptions.icon = randomString + selectedIcon;
</script>

<div class='flex h-full w-full  justify-center items-center relative'>
  {#if roomIconPickerOpen}
    <div
      class='h-full w-[12%] bg-gray-600/50 rounded-lg flex justify-center overflow-y-scroll absolute left-10 py-4'
      use:clickOutside
      on:clickOutside={() => (roomIconPickerOpen = false)}>

      <RoomIconPicker
        bind:roomIconPickerOpen
        bind:selectedIcon
        bind:randomString></RoomIconPicker>
    </div>
  {/if}

  {#if gameModePickerOpen}
    <div
      class='h-full w-[12%] bg-gray-600/50 rounded-lg flex justify-center overflow-y-scroll absolute right-10 py-4'
      class:h-[80%]={description !== ''}
      use:clickOutside
      on:clickOutside={() => (gameModePickerOpen = false)}>

      <GameModePicker
        bind:gameModePickerOpen
        bind:gameMode={roomCreateOptions.gameMode}
        bind:description
      ></GameModePicker>
    </div>
  {/if}

  {#if description !== ''}
    <div
      class='h-[15%] w-[70%] bg-gray-600/50 rounded-lg mx-6 flex justify-center items-center absolute bottom-5 translate-x-[-7%]'
    >
      <h1>{description}</h1>
    </div>
  {/if}

  <div
    class='flex w-[70%] flex-row items-center justify-center px-2 py-6 bg-gray-700/75 rounded-lg gap-x-8 transition duration-500 ease-in-out'
    class:translate-x-[7%]={roomIconPickerOpen}
    class:translate-x-[-7%]={gameModePickerOpen}
    class:translate-y-[-7%]={description !== ''}
  >
    <div class='flex h-full items-center justify-center'>
      <button on:click={() => (roomIconPickerOpen = true)}>
        <svg
          class='bg-white'
          width={ICON_SIZE}
          height={ICON_SIZE}
          data-jdenticon-value={roomCreateOptions.icon}></svg>
      </button>
    </div>
    <div class='grid w-[70%] gap-4 md:gap-6 px-4'>
      <div class='grid gap-2'>
        <label
          class='text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          for='room-name'>
          Room Name
        </label><input
        class='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-center text-sm text-black file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        id='room-name'
        placeholder='New Room'
        type='text'
        bind:value={roomCreateOptions.name} />
      </div>
      <div class='grid gap-2'>
        <label
          class='text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          for='room-name'>
          Game Mode
        </label>
        <div class='w-full'>
          <Button onClick={() => gameModePickerOpen = true}>
            {roomCreateOptions.gameMode}
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>
