<script lang="ts">
	let clipboard = false;
</script>

<div class="flex flex-row gap-4">
	<button
		on:click={() => {
			clipboard = true;
			navigator.clipboard.writeText(window.location.href);
			setTimeout(() => {
				clipboard = false;
			}, 2000);
		}}
		class="active:enabled::shadow-none disabled relative m-1 inline-flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded rounded-lg border-gray-700 bg-gray-600/60 px-3.5 py-2 text-xl text-white shadow-lg hover:from-gray-600 hover:to-gray-600/50 enabled:border-b-4 enabled:border-l-2 hover:enabled:bg-gradient-to-t active:enabled:border-gray-600 disabled:bg-gray-800/60"
	>
		{#if clipboard}
			<span class="material-symbols-outlined material-icons !text-5xl text-green-300">check</span>
		{:else}
			<span class="material-symbols-outlined material-icons !text-5xl group-hover:text-gray-400">link</span>
		{/if}
	</button>
</div>
