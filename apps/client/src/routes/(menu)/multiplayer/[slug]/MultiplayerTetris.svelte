<script lang="ts">
	import { onMount } from 'svelte';
	import { Manager } from '../../../../TetrisPixi/Manager';
	import MultiPlayerGameScene from '../../../../TetrisPixi/scenes/MultiPlayerGameScene';
	import { roomStore } from '$lib/stores/multiplayerStore';
	import { MessageTypeEnum } from '@jmischler72/shared';
	import { onKeyDown } from '$lib/functions/helpers/InputHelper';

	function onInput(event: KeyboardEvent) {
		let action = onKeyDown(event);
		if (action) $roomStore?.send(MessageTypeEnum.PLAYER_ACTION, action);
	}

	onMount(() => {
		window.addEventListener('keydown', onInput);
		Manager.initialize(new MultiPlayerGameScene());

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
