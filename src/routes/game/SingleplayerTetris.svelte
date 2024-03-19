<script lang="ts">
    import {onMount} from "svelte";
    import {Manager} from "../../TetrisPixi/Manager";
    import SinglePlayerGameScene from "../../TetrisPixi/scenes/SinglePlayerGameScene";
    import {SinglePlayerInstance} from "@jmischler72/core-tetris";
    import InputManager from "../../TetrisPixi/input-manager/InputManager";
    import {inGame} from "../controlsStore";
    import {goto} from "$app/navigation";

    const instance: SinglePlayerInstance = new SinglePlayerInstance();
    $inGame = true;

    function quitGame(event: KeyboardEvent){
        if (event.key === "Escape") goto('/');
    }

    onMount(() => {
        $inGame = true;
        new InputManager((action) => instance.handleAction(action));

        Manager.initialize(0x1a1a1a);
        Manager.changeScene(new SinglePlayerGameScene(instance));
        window.addEventListener('keydown', quitGame);

        return () => {
            $inGame = false;
            instance.stopGame();
            window.removeEventListener("keydown", quitGame);

        };
    });

</script>

<canvas id="pixi-canvas"></canvas>
<style>
    :root {
        overflow: hidden;
    }
</style>

