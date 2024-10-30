<script>
	import { goto } from '$app/navigation';
</script>

<div class="relative flex aspect-square h-full flex-col items-center justify-center gap-y-4 text-6xl text-gray-200">
	<button
		title="Multiplayer"
		class="group flex h-1/2 w-full items-center justify-center rounded-xl bg-black bg-opacity-60 transition-shadow hover:shadow-lg hover:shadow-gray-900"
		on:click={() => goto('/multiplayer')}
	>
		<span class="material-symbols-outlined material-icons !text-7xl group-hover:text-gray-400">public</span>
	</button>
	<div class="flex h-1/2 w-full flex-row gap-x-4">
		<button
			title="Play"
			class="group flex w-1/2 items-center justify-center rounded-xl bg-black bg-opacity-60 transition-shadow hover:shadow-lg hover:shadow-gray-900"
			on:click={() => goto('/game')}
		>
			<span class="material-symbols-outlined material-icons !text-7xl group-hover:text-gray-400">play_arrow</span>
		</button>
		<button
			title="Settings"
			class="group flex w-1/2 items-center justify-center rounded-xl bg-black bg-opacity-60 transition-shadow hover:shadow-lg hover:shadow-gray-900"
			on:click={() => goto('/settings')}
		>
			<span class="material-symbols-outlined material-icons !text-7xl group-hover:text-gray-400">settings</span>
		</button>
	</div>
</div>
