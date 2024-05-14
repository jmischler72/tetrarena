<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import Menu from '$lib/components/menu/Menu.svelte';
	import { roomStore } from '$lib/stores/MultiplayerStore';
	import Snackbar from './Snackbar.svelte';

	let loading = false;

	beforeNavigate(() => {
		// before navigate prevent onbeforeunload to be called so i set reconnectionToken here
		if ($roomStore) localStorage.setItem('reconnectionToken', $roomStore.reconnectionToken);
		loading = true;
	});

	afterNavigate(() => {
		loading = false;
	});
</script>

<Menu>
	{#if loading}
		<div class="flex h-full w-full items-center justify-center">
			<LoadingSpinner />
		</div>
	{:else}
		<slot />
	{/if}
</Menu>
<Snackbar></Snackbar>

<style lang="scss">
	$animation-duration: 0.3s;

	:global(.animation-up) {
		animation:
			$animation-duration ease-out translate_up forwards,
			$animation-duration ease-out opacityin forwards;
	}

	@keyframes translate_up {
		from {
			transform: translateY(12px);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
