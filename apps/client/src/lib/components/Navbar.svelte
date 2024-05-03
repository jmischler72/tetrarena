<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate, goto } from '$app/navigation';
	import { leaveRoom } from '$lib/functions/services/RoomService';
	import MediaQuery from '$lib/components/MediaQuery.svelte';

	let previousPage: string = '/';
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<nav
	class="animation z-10 flex h-[100px] items-center justify-between overflow-hidden rounded bg-gray-700/75 bg-none text-gray-200"
>
	<div class="flex w-1/3 justify-start pl-16 text-xl lg:text-2xl">
		{#if $page.url.pathname.split('/')[1] === 'multiplayer' && $page.url.pathname.split('/').length > 2}
			<button
				class="group flex cursor-pointer items-center"
				class:animation-left={previousPage === '/'}
				on:click={() => leaveRoom()}
			>
				<span class="translate-x-[-2px] opacity-40 transition group-hover:translate-x-[-6px]">x</span>quit
			</button>
		{:else}
			<button
				class="group flex cursor-pointer items-center"
				class:animation-left={previousPage === '/'}
				on:click={() => goto(previousPage)}
			>
				<span class="translate-x-[-2px] translate-y-[1px] opacity-40 transition group-hover:translate-x-[-6px]"
					>&#60;</span
				>back
			</button>
		{/if}
	</div>
	<MediaQuery query="(min-width: 1050px)" let:matches>
		{#if matches}
			<div class="flex w-1/3 justify-center text-3xl" class:animation-up={previousPage === '/'}>
				<h1 class="border-2 border-solid border-white p-1 text-gray-200">tetrarena</h1>
			</div>
		{/if}
	</MediaQuery>
	<h1 class="flex w-1/3 justify-end text-nowrap pr-16 text-xl lg:text-2xl" class:animation-right={previousPage === '/'}>
		/{$page.url.pathname.split('/')[1]}
	</h1>
</nav>

<style lang="scss">
	nav {
		font-family: 'Press Start 2P', system-ui;
	}

	$animation-duration: 0.45s;

	.animation-up {
		animation:
			$animation-duration ease-out translate_up forwards,
			$animation-duration ease-out opacityin forwards;
	}

	.animation-left {
		animation:
			$animation-duration ease-out translate_left forwards,
			$animation-duration ease-out opacityin forwards;
	}

	.animation-right {
		animation:
			$animation-duration ease-out translate_right forwards,
			$animation-duration ease-out opacityin forwards;
	}

	@keyframes translate_up {
		from {
			transform: translateY(20px);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes translate_left {
		from {
			transform: translateX(40px);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes translate_right {
		from {
			transform: translateX(-40px);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes opacityin {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
