<script lang="ts">
    import {onMount} from "svelte";
    import {Manager} from "../../../TetrisPixi/Manager";
    import MultiPlayerGameScene from "../../../TetrisPixi/scenes/MultiPlayerGameScene";
    import {ActionsEnum} from "@jmischler72/core-tetris";
    import {gameStatesStore, roomStore} from "$lib/stores/multiplayerStore";
    import InputManager from "../../../TetrisPixi/input-manager/InputManager";
    import {toGameStateDTO} from "$lib/functions/helpers/ColyseusSchemaHelper";
    import {get} from "svelte/store";
    import {MessageTypeEnum} from "$lib/data/MessageTypeEnum";

    function onInput(action: ActionsEnum) {
        if ($roomStore) $roomStore.send(MessageTypeEnum.PLAYER_ACTION, action);
    }
    let inputManager =  new InputManager((action) => onInput(action));

    function initMultiplayerGame(){
        Manager.initialize();
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

        let interval = setInterval(()=>{
            $roomStore?.send(MessageTypeEnum.PING);
        }, 1000);

        return () => {
            console.log("destroying game");
            clearInterval(interval);
            Manager.destroy();
            inputManager.destroy();
        }
    });
</script>

<canvas id="pixi-canvas"></canvas>
<style>
    :root {
        overflow: hidden;
    }
</style>

