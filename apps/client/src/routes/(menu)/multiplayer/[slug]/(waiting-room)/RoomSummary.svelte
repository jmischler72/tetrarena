<script lang="ts">
  import type { RoomOptions } from "@jmischler72/shared";
  import Button from "$lib/components/Button.svelte";
  import { roomStore } from "$lib/stores/multiplayerStore";

  export let roomOptions: RoomOptions;
  export let showOptionsMenu: boolean;
</script>

<div class="h-full p-4  rounded items-center justify-start bg-gray-700 flex flex-col relative ">
  <div class="w-full p-4 bg-gray-800 overflow-y-scroll rounded">
    <div class="w-full  gap-6 flex flex-col p-4 rounded ">
      <h1 class="underline">Room</h1>
      <div class=" w-full bg-gray-700 flex justify-center py-4 rounded">
        <svg
          class="bg-white rounded" width="60"
          height="60" data-jdenticon-value="{roomOptions.icon}"></svg>
      </div>
      <div class=" w-full bg-gray-700 flex justify-center py-4 rounded">
        <h1>{roomOptions.name}</h1>
      </div>

      <div class=" w-full bg-gray-700 flex justify-center py-4 rounded">
        <h1>{roomOptions.gameMode.name}</h1>
      </div>
    </div>
    <div class="w-full  gap-6 flex flex-col p-4 rounded ">
      <h1 class="underline">Game</h1>
      <div class=" w-full bg-gray-700 flex justify-center py-4 rounded">
        <h1>{roomOptions.gameMode.options.goalScore}</h1>
      </div>
      <div class=" w-full bg-gray-700 flex justify-center py-4 rounded">
        <h1>{roomOptions.gameMode.options.goalScore}</h1>
      </div>
      <div class=" w-full bg-gray-700 flex justify-center py-4 rounded">
        <h1>{roomOptions.gameMode.options.goalScore}</h1>
      </div>
    </div>
  </div>
  {#if $roomStore?.sessionId === $roomStore?.state.admin}
    <div class="absolute right-5 bottom-5">
      <Button onClick={()=>showOptionsMenu = true}
      >
        <i class="material-symbols-outlined">tune</i>
      </Button>
    </div>
  {/if}
</div>