<script lang='ts'>
    import {onMount} from 'svelte';
    import {Manager} from '../../../TetrisPixi/Manager';
    import MultiPlayerGameScene from '../../../TetrisPixi/scenes/MultiPlayerGameScene';
    import {playersStore, roomStore} from '$lib/stores/multiplayerStore';
    import {MessageTypeEnum, toGameStateDTO} from '@jmischler72/types';
    import {onKeyDown} from '$lib/functions/helpers/InputHelper';

    function onInput(event: KeyboardEvent) {
        let action = onKeyDown(event);
        if (action) $roomStore?.send(MessageTypeEnum.PLAYER_ACTION, action);
    }

    $:$roomStore?.state.players.onAdd((player, key) => {
        $playersStore.set(key, {
            name: key,
            connected: player.connected,
        });

        player.listen('connected', (connected) => {
            $playersStore.get(key).connected = connected;
        });
        player.gameState.onChange(() => {
            $playersStore.get(key).gameState = toGameStateDTO(player.gameState);
        });
    });

    $roomStore?.state.players.onRemove((player, key) => {
        console.log(key, 'has been removed from the room');
        $playersStore.delete(key);
    });

    onMount(() => {
        window.addEventListener('keydown', onInput);
        Manager.initialize();
        Manager.changeScene(new MultiPlayerGameScene());

        let interval = setInterval(() => {
            $roomStore?.send(MessageTypeEnum.PING);
        }, 1000);

        return () => {
            clearInterval(interval);
            Manager.destroy();
            window.removeEventListener('keydown', onInput);
        };
    });
</script>


<canvas id='pixi-canvas'></canvas>
<style>
    :root {
        overflow: hidden;
    }
</style>

