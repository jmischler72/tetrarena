<script lang='ts'>
	import { onMount } from 'svelte';
	import { Manager } from '../../../TetrisPixi/Manager';
	import MultiPlayerGameScene from '../../../TetrisPixi/scenes/MultiPlayerGameScene';
	import { gameStatesStore, roomStore } from '$lib/stores/multiplayerStore';
	import { toGameStateDTO } from '@jmischler72/shared';
	import { get } from 'svelte/store';
	import { MessageTypeEnum } from '@jmischler72/shared';
	import { onKeyDown } from '$lib/functions/helpers/InputHelper';

	function onInput(event: KeyboardEvent) {
		let action = onKeyDown(event);
		if(action) $roomStore?.send(MessageTypeEnum.PLAYER_ACTION, action);
	}

	$roomStore?.state.players.onAdd((player, key) => {
		console.log(key, 'has been added to the room');
		// add your player entity to the game world!
		// If you want to track changes on a child object inside a map, this is a common pattern:
		player.onChange(() => {
			let gameStates = get(gameStatesStore);
			gameStates.set(key, toGameStateDTO(player));
		});
	});

	onMount(() => {
		window.addEventListener('keydown', onInput);
		Manager.initialize();
		Manager.changeScene(new MultiPlayerGameScene());

		let interval = setInterval(() => {
			$roomStore?.send(MessageTypeEnum.PING);
		}, 1000);

		return () => {
			console.log('destroying game');
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

