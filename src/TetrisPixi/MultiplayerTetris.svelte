<script lang="ts">
  import { onMount } from "svelte";
  import { Manager } from "./Manager";
  import MultiPlayerGameScene from "./scenes/MultiPlayerGameScene";
  import { socketManager } from "../routes/multiplayer/multiplayerStores";
  import { ClientEvents } from "$lib/Enums/client/ClientEvents";
  import { ActionsEnum } from "@jmischler72/core-tetris";

  onMount(() => {
    Manager.initialize(0x2e2e2e);
    const onInput = (input: string) => {
      $socketManager.emit({
        event: ClientEvents.GameInput,
        data: input
      });
    };

    function handleKeydown(event: KeyboardEvent) {
      if (event.defaultPrevented) {
        return;
      }

      let action: ActionsEnum;
      switch (event.code) {
        case "ArrowDown":
          action = ActionsEnum.GO_DOWN;
          break;
        case "ArrowLeft":
          action = ActionsEnum.GO_LEFT;
          break;
        case "ArrowRight":
          action = ActionsEnum.GO_RIGHT;
          break;
        case "Space":
          action = ActionsEnum.ROTATE;
          break;
        case "ShiftLeft":
          action = ActionsEnum.INSTANT_PLACE;
          break;
      }
      if(action) onInput(action);
    }

    window.onkeydown = handleKeydown;
    Manager.changeScene(new MultiPlayerGameScene());

  });
</script>

<canvas id="pixi-canvas"></canvas>
<style>
    :root {
        overflow: hidden;
    }
</style>

