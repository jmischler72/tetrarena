<script lang="ts">
  import type { RoomOptions } from "@jmischler72/shared";
  import Button from "$lib/components/Button.svelte";

  export let roomOptions: RoomOptions;
</script>

<div class="h-full p-8 rounded items-center justify-between bg-gray-600/40 flex flex-col relative">
  <svg
    class="bg-white rounded" width="60"
    height="60" data-jdenticon-value="{roomOptions.icon}"></svg>
  <h1>{roomOptions.name}</h1>
  <h1>{roomOptions.gameMode.name}</h1>
  <div class="absolute right-5 bottom-5">
    <Button onClick={()=>{}}
    >
      <i class="material-symbols-outlined">tune</i>
    </Button>
  </div>
</div>