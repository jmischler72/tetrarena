<script lang="ts">
	export let icon: string;
	export let roomIconPickerOpen: boolean;
	export let randomIcons: string[];

	const ICON_SIZE = 120;
</script>

<div class="grid grid-cols-1 gap-x-8 gap-y-4 rounded-lg">
	{#each randomIcons as randomIcon}
		<button
			on:click={() => {
				icon = randomIcon;
				roomIconPickerOpen = false;
			}}
		>
			<svg
				class="box-border rounded border-gray-900 bg-white"
				class:border-4={icon === randomIcon}
				class:hover:border-2={icon !== randomIcon}
				width={ICON_SIZE}
				height={ICON_SIZE}
				data-jdenticon-value={randomIcon}
			></svg>
		</button>
	{/each}
</div>
