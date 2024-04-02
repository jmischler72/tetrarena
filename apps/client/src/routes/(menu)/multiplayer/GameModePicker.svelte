<script lang='ts'>
	import Button from '$lib/components/Button.svelte';

	export let gameMode: string;
	export let gameModePickerOpen: boolean;
	export let description: string;

	let gameModes = [
		{ name: 'First', description: 'Be the first to reach the goal score' },
		{ name: 'TEst', description: 'd' }
	];

</script>

<div class='rounded-lg gap-y-4 gap-x-8 flex flex-col'>
	{#each gameModes as mode}
		<div class='h-[15%]'>
			<Button onMouseOver={()=> description= mode.description} onMouseLeave={()=> description = ''}
							onClick={()=> {
								gameModePickerOpen = false;
								gameMode = mode.name;
								description = ''}}>
				{mode.name}
			</Button>
		</div>
	{/each}
</div>
