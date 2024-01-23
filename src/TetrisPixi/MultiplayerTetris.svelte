<script lang="ts">
  import { onMount } from "svelte";
  import { Manager } from "./Manager";
  import MultiPlayerGameScene from "./scenes/MultiPlayerGameScene";
  import { ActionsEnum } from "@jmischler72/core-tetris";

  onMount(() => {
    Manager.initialize(0x2e2e2e);


    Manager.changeScene(new MultiPlayerGameScene());

  });
</script>

<canvas id="pixi-canvas"></canvas>
<style>
    :root {
        overflow: hidden;
    }
</style>

