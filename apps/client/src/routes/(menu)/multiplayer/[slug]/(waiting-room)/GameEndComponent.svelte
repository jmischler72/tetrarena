<script lang="ts">
	import { roomStateStore } from '$lib/stores/multiplayerStore';
</script>

<div class="flex flex-col items-center justify-center gap-6 p-8">
	<h1>&#128081;</h1>
	<h1>Winner: {$roomStateStore?.winner}</h1>
</div>
