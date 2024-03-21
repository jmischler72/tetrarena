<script lang="ts">
    import {onMount} from "svelte";
    import {Manager} from "../../../TetrisPixi/Manager";
    import MultiPlayerGameScene from "../../../TetrisPixi/scenes/MultiPlayerGameScene";
    import {ActionsEnum} from "@jmischler72/core-tetris";
    import {gameStatesStore, roomStore} from "../multiplayerStore";
    import InputManager from "../../../TetrisPixi/input-manager/InputManager";
    import {inGame} from "../../controlsStore";
    import {get} from "svelte/store";
    import {toGameStateDTO} from "./types/utils";

    function onInput(action: ActionsEnum) {
        if ($roomStore) $roomStore.send("action", action);
    }

    function initMultiplayerGame(){
        new InputManager((action) => onInput(action));

        Manager.initialize(0x2e2e2e);
        Manager.changeScene(new MultiPlayerGameScene());
    }
    function onPlayersChange(){
        if(!$roomStore) return;
        $roomStore.state.players.onAdd((player, key) => {
            console.log(key, "has been added to the room");
            // add your player entity to the game world!
            // If you want to track changes on a child object inside a map, this is a common pattern:
            player.onChange(() => {
                let gameStates = get(gameStatesStore);
                gameStates.set(key, toGameStateDTO(player));
            })
        });
    }

    onMount(() => {
        initMultiplayerGame();
        onPlayersChange();
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

