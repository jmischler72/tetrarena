<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	export let callback: () => Promise<any>;
</script>

{#await callback()}
	<div class="flex h-full w-full items-center justify-center">
		<LoadingSpinner />
	</div>
{:then _}
	<slot />
{:catch _}
	<div class="flex h-full w-full items-center justify-center text-2xl">
		<h1>
			Connection Error... <a
				class="rounded bg-white p-1 text-black no-underline"
				href="/"
				on:click={() => location.reload()}>Try Again</a
			>
		</h1>
	</div>
{/await}
