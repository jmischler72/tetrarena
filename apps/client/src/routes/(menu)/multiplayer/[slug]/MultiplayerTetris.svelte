<script lang='ts'>
  import { onMount } from 'svelte';
  import { Manager } from '../../../../TetrisPixi/Manager';
  import MultiPlayerGameScene from '../../../../TetrisPixi/scenes/MultiPlayerGameScene';
  import { playersStore, roomStore } from '$lib/stores/multiplayerStore';
  import { MessageTypeEnum, toGameStateDTO } from '@jmischler72/types';
  import { onKeyDown } from '$lib/functions/helpers/InputHelper';

  function onInput(event: KeyboardEvent) {
    let action = onKeyDown(event);
    if (action) $roomStore?.send(MessageTypeEnum.PLAYER_ACTION, action);
  }

  $:$roomStore?.state.players.onAdd((player, key) => {
    $playersStore.set(key, {
      name: key,
      connected: player.connected
    });

    const currentPlayer = $playersStore.get(key);
    if (!currentPlayer) return;

    currentPlayer.gameState = toGameStateDTO(player.gameState);

    player.listen('connected', (connected) => {
      currentPlayer.connected = connected;
    });

    player.gameState.onChange(() => {
      currentPlayer.gameState = toGameStateDTO(player.gameState);
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


<canvas id='pixi-canvas' class="fixed left-0 top-0 w-full h-full"></canvas>
<style>
    :root {
        overflow: hidden;
    }
</style>

