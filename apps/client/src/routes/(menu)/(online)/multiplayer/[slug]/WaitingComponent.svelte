<script lang="ts">
	import CurrentPlayers from './(waiting-room)/CurrentPlayers.svelte';
	import RoomSummary from './(waiting-room)/RoomSummary.svelte';
	import ChatComponent from './(waiting-room)/ChatComponent.svelte';
</script>

<div class="flex h-full w-full flex-row justify-end">
	<div class="w-1/3 rounded-lg p-2 pr-8">
		<ChatComponent />
	</div>
	<div class="flex w-1/3 flex-col">
		<CurrentPlayers></CurrentPlayers>
	</div>
	<div class="w-1/3 rounded-lg p-2 pl-8">
		<RoomSummary></RoomSummary>
	</div>
</div>
