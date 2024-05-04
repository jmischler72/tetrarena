<script lang="ts">
	import { snackbarStore } from '$lib/stores/SnackbarStore';

	let message: string;
	$: message = $snackbarStore !== '' ? $snackbarStore : message;
	$: if ($snackbarStore) setTimeout(() => ($snackbarStore = ''), 3000);
</script>

<div
	class="pointer-events-none absolute bottom-10 right-10 z-30 flex w-[40%] justify-center rounded-lg bg-gray-800 p-2 transition"
	class:opacity-0={$snackbarStore === ''}
>
	<div class="flex h-full w-full justify-center rounded border-2 border-solid border-gray-600 py-8">
		<h1 class="text-white">{message}</h1>
	</div>
</div>
