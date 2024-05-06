<script lang="ts">
	import { onMount } from 'svelte';
	import { Manager } from '../../../../TetrisPixi/Manager';
	import MultiPlayerGameScene from '../../../../TetrisPixi/scenes/MultiPlayerGameScene';
	import { roomStore } from '$lib/stores/MultiplayerStore';
	import { MessageTypeEnum, toGameStateDTO } from '@jmischler72/shared';
	import { onKeyDown } from '$lib/functions/helpers/InputHelper';

	function onInput(event: KeyboardEvent) {
		let action = onKeyDown(event);
		if (action) $roomStore?.send(MessageTypeEnum.PLAYER_ACTION, action);
	}

	let multiPlayerGameScene = new MultiPlayerGameScene();

	$roomStore?.state.players.onAdd((player, key) => {
		player.gameState.onChange(() => {
			multiPlayerGameScene.updatePlayerBoard(key, toGameStateDTO(player.gameState));
		});

		player.listen('connected', (value) => {
			multiPlayerGameScene.renderDisconnectOverlayForBoard(key, value);
		});
	});

	onMount(() => {
		window.addEventListener('keydown', onInput);
		Manager.initialize(multiPlayerGameScene);

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

<canvas id="pixi-canvas" class="fixed left-0 top-0 h-full w-full"></canvas>

<style>
	:root {
		overflow: hidden;
	}
</style>
