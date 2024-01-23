<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {Manager} from "./Manager";
    import SinglePlayerGameScene from "./scenes/SinglePlayerGameScene";
    import {SinglePlayerInstance, ActionsEnum} from "@jmischler72/core-tetris";

    function handleKeyDown(event: KeyboardEvent, game: SinglePlayerInstance) {
        if (event.defaultPrevented) {
            return;
        }
        if (game.game.isGameOver) {
            return;
        }
        switch (event.code) {
            case "ArrowDown":
                game.handleAction(ActionsEnum.GO_DOWN);
                break;
            case "ArrowLeft":
                game.handleAction(ActionsEnum.GO_LEFT);
                break;
            case "ArrowRight":
                game.handleAction(ActionsEnum.GO_RIGHT);
                break;
            case "Space":
                game.handleAction(ActionsEnum.ROTATE);
                break;
            case "ShiftLeft":
                game.handleAction(ActionsEnum.INSTANT_PLACE);
                break;
        }
        event.preventDefault();
    }

    const instance: SinglePlayerInstance = new SinglePlayerInstance();

    onMount(() => {
        window.onkeydown = (e) => handleKeyDown(e, instance);
        Manager.initialize(0x2e2e2e);
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

