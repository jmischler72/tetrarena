<script lang="ts">
    import {onMount} from "svelte";
    import {Manager} from "./Manager";
    import SinglePlayerGameScene from "./scenes/SinglePlayerGameScene";
    import {SinglePlayerInstance} from "@jmischler72/core-tetris";
    import InputManager from "./input-manager/InputManager";

    const instance: SinglePlayerInstance = new SinglePlayerInstance();

    onMount(() => {
        new InputManager((action) => instance.handleAction(action));

        Manager.initialize(0x1a1a1a);
        Manager.changeScene(new SinglePlayerGameScene(instance));

        return () => {
            instance.stopGame()
        };
    });

</script>

<canvas id="pixi-canvas"></canvas>
<style>
    :root {
        overflow: hidden;
    }
</style>

