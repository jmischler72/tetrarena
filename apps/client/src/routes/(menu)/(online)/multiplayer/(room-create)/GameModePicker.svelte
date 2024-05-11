<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { roomOptionsDescriptionStore } from '$lib/stores/RoomOptionsDescriptionStore';
	import { defaultGameModes } from '@jmischler72/shared';
	import type { GameModeEnum } from '@jmischler72/shared';

	export let gameMode: GameModeEnum;
	export let gameModePickerOpen: boolean;
</script>

<div class="flex flex-col gap-x-8 gap-y-4 rounded-lg">
	{#each defaultGameModes as mode}
		<div class="h-[15%]">
			<Button
				onMouseOver={() => ($roomOptionsDescriptionStore = mode.description)}
				onMouseLeave={() => ($roomOptionsDescriptionStore = '')}
				onClick={() => {
					gameModePickerOpen = false;
					$roomOptionsDescriptionStore = '';
					gameMode = mode.mode;
				}}
			>
				{mode.name}
			</Button>
		</div>
	{/each}
</div>
