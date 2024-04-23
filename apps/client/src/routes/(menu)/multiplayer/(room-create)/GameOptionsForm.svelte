<script lang="ts">
  import { type RoomOptions } from "@jmischler72/shared";

  export let roomOptions: RoomOptions;
  let gameOptions = roomOptions.gameMode.options;
</script>

<div class="flex h-full w-full justify-center items-center relative animation-up">

  <div
    class="flex w-[70%] flex-col items-center justify-center px-2 py-6 bg-gray-700/75 rounded-lg gap-x-8 transition duration-500 ease-in-out"
  >
    <label
      class="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      for="room-name">
      Goal Score
    </label><input
    class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-center text-sm text-black file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    id="room-name"
    type="number"
    min="0"
    max="1000"
    bind:value={gameOptions.goalScore}
  />
  </div>
</div>
