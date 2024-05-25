<script lang="ts">
	import { marked } from 'marked';
	import changelog from '../../../../CHANGELOG.md?raw';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log(marked.parse(changelog));

		document.getElementById('content').innerHTML = <string>marked.parse(changelog);
	});
</script>

<div class="flex h-full w-full flex-col space-y-4 overflow-y-scroll p-6">
	<div id="content" class="markdown"></div>
</div>

<style lang="scss">
	.markdown {
		font-family: Arial, serif;
	}
</style>
