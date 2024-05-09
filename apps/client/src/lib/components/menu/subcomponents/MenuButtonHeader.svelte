<script lang="ts">
	import MediaQuery from '$lib/components/MediaQuery.svelte';

	export let icon: string;
	export let text: string;
	export let selected: boolean;
	export let customStyle: string = '';
</script>

<button
	on:click
	class="z-20 flex h-full flex-row items-center gap-x-4 rounded-lg px-4 {selected
		? 'bg-gray-600/60'
		: ''} {customStyle}"
>
	<i class="material-symbols-outlined">{icon}</i>
	<MediaQuery query="(min-width: 1050px)" let:matches>
		{#if matches}
			<span class="text-md font-semibold">{text}</span>
		{/if}
	</MediaQuery>
</button>
