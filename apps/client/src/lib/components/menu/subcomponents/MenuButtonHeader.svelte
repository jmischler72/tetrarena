<script lang="ts">
	import MediaQuery from '$lib/components/MediaQuery.svelte';

	export let icon: string;
	export let text: string;
	export let selected: boolean;
	export let customStyle: string = '';
</script>

<MediaQuery query="(min-width: 1050px)" let:matches>
	<button
		on:click
		class="z-20 flex h-full flex-row items-center gap-x-4 rounded-lg px-4 text-xl {selected
			? 'bg-gray-600/60'
			: ''} {customStyle}"
	>
		<i class="material-symbols-outlined {matches ? '' : '!text-4xl'}">{icon}</i>
		{#if matches}
			<span class="font-semibold">{text}</span>
		{/if}
	</button>
</MediaQuery>
