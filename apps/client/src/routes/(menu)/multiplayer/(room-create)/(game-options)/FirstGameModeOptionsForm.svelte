<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { type FirstGameModeOptions, type RoomOptions } from '@jmischler72/shared';

	export let roomOptions: RoomOptions;

	let gameOptions = roomOptions.gameOptions as FirstGameModeOptions;

	$: gameOptions.goalScore = parseInt(gameOptions.goalScore.toString());
</script>

<div class="animation-up relative flex h-full w-full items-center justify-center">
	<Input bind:value={gameOptions.goalScore} label={'Goal Score'} type={'number'} />
</div>
