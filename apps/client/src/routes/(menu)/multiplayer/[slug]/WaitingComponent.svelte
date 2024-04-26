<script lang="ts">
  import GameEndComponent from "./(waiting-room)/GameEndComponent.svelte";
  import { roomStore } from "$lib/stores/multiplayerStore.js";
  import CurrentPlayers from "./(waiting-room)/CurrentPlayers.svelte";
  import RoomSummary from "./(waiting-room)/RoomSummary.svelte";
  import type { RoomOptions } from "@jmischler72/shared";

  export let players: Map<string, boolean>;
  export let roomOptions: RoomOptions;
  export let showOptionsMenu: boolean;
  let winner: string = "";

  $roomStore?.state.listen("winner", (currentValue) => {
    winner = currentValue;
  });


</script>

<div class="w-full h-full flex flex-row justify-end">
  <div class="w-1/3 flex flex-col">
    {#if winner !== ""}
      <GameEndComponent winner={winner} />
    {/if}
    <CurrentPlayers bind:players="{players}"></CurrentPlayers>
  </div>
  <div class="w-1/3 p-8 pl-24 rounded-lg">
    <RoomSummary bind:roomOptions bind:showOptionsMenu></RoomSummary>
  </div>
</div>