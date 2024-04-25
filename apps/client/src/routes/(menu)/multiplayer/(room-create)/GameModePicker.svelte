<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { type GameMode, gameModes } from "@jmischler72/shared";

  export let gameMode: GameMode;
  export let gameModePickerOpen: boolean;
  export let showDescription: boolean;

</script>

<div class="rounded-lg gap-y-4 gap-x-8 flex flex-col">
  {#each gameModes as mode}
    <div class="h-[15%]">
      <Button onMouseOver={()=> showDescription = true} onMouseLeave={()=> showDescription = false}
              onClick={()=> {
								gameModePickerOpen = false;
                showDescription = false;
								gameMode = mode;
								}}>
        {mode.name}
      </Button>
    </div>
  {/each}
</div>
