<script lang="ts">
    import {onMount} from "svelte";
    import {Manager} from "./Manager";
    import MultiPlayerGameScene from "./scenes/MultiPlayerGameScene";
    import {ActionsEnum} from "@jmischler72/core-tetris";
    import {roomStore} from "../routes/multiplayer/multiplayerStore";
    import InputManager from "./input-manager/InputManager";
    import {inGame} from "../routes/controlsStore";

    function onInput(action: ActionsEnum) {
        if ($roomStore) $roomStore.send("action", action);
    }

    onMount(() => {
        $inGame = true;
        new InputManager((action) => onInput(action));

        Manager.initialize(0x2e2e2e);
        Manager.changeScene(new MultiPlayerGameScene());

        return (() => {
            $inGame = false;
        })
    });
</script>

<canvas id="pixi-canvas"></canvas>
<style>
    :root {
        overflow: hidden;
    }
</style>

