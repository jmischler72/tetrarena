<script lang="ts">
	import { onMount } from 'svelte';
	import { Manager } from '$lib/pixi/Manager';
	import MultiPlayerGameScene from '$lib/pixi/scenes/MultiPlayerGameScene';
	import { roomStore, roomStateStore } from '$lib/stores/MultiplayerStore';
	import { MessageTypeEnum, toGameStateDTO } from '@jmischler72/shared';
	import { onKeyDown } from '$lib/functions/helpers/InputHelper';

	function onInput(event: KeyboardEvent) {
		event.preventDefault();
		let action = onKeyDown(event);
		if (action) $roomStore?.send(MessageTypeEnum.PLAYER_ACTION, action);
	}

	let oppNames: string[] = [];
	$roomStateStore?.players.forEach((player, key) => {
		if (key !== $roomStore?.sessionId) oppNames.push(player.username);
	});

	let multiPlayerGameScene = new MultiPlayerGameScene(
		$roomStateStore?.players.get($roomStore?.sessionId || '')?.username || '',
		oppNames[0] || '',
	);

	onMount(() => {
		Manager.initialize(multiPlayerGameScene);
		if (!$roomStore) return;

		const listeners: (() => void)[] = [];

		$roomStore.state.players.forEach((player, key) => {
			listeners.push(
				player.gameState.onChange(() => {
					// console.log('updatePlayerBoard');
					multiPlayerGameScene.updatePlayerBoard(key, toGameStateDTO(player.gameState));
				}),
			);

			listeners.push(
				player.listen('connected', (value) => {
					multiPlayerGameScene.renderDisconnectOverlayForBoard(key, value);
				}),
			);
		});

		// let interval = setInterval(() => {
		// 	$roomStore?.send(MessageTypeEnum.PING);
		// }, 1000);

		return () => {
			// clearInterval(interval);
			Manager.destroy();
			listeners.forEach((listener) => listener());
		};
	});
</script>

<svelte:window on:keydown={onInput} />

<canvas id="pixi-canvas" class="fixed left-0 top-0 h-full w-full"></canvas>

<style>
	:root {
		overflow: hidden;
	}
</style>
