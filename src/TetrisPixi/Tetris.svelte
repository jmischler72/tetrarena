<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {Manager} from "./Manager";
    import SinglePlayerGameScene from "./scenes/SinglePlayerGameScene";
    import {SinglePlayerInstance, ActionsEnum} from "@jmischler72/core-tetris";
    import Keyboard from "../ControlManager/Keyboard";

    const instance: SinglePlayerInstance = new SinglePlayerInstance();

    onMount(() => {
        new Keyboard((action) => instance.handleAction(action));

        Manager.initialize(0x1a1a1a);
        Manager.changeScene(new SinglePlayerGameScene(instance));
    });

    onDestroy(() => {
        instance.stopGame();
    });
</script>

<canvas id="pixi-canvas"></canvas>
<style>
    :root {
        overflow: hidden;
    }
</style>

