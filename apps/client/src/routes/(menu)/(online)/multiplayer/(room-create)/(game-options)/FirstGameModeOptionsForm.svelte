<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { type FirstGameModeOptions, type RoomOptions } from '@jmischler72/shared';

	export let gameOptions: FirstGameModeOptions;

	$: gameOptions.goalScore = parseInt(gameOptions.goalScore.toString());
</script>

<div class="animation-up flex h-full w-full flex-col items-center justify-center gap-4">
	<Input bind:value={gameOptions.goalScore} label={'Goal Score'} type={'number'} />
	<Input bind:value={gameOptions.opponentAttacking} label={'Opponent Attacking'} type={'checkbox'} />
</div>
