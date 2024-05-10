<script>
	import MediaQuery from '../MediaQuery.svelte';
	import Navbar from '../Navbar.svelte';
</script>

<MediaQuery query="(min-width: 1050px)" let:matches>
	<div class="flex h-full w-full flex-col gap-6 {matches ? 'p-8' : 'py-8'}">
		<Navbar />
		<div class="z-10 flex h-[90%] w-full flex-col justify-start overflow-hidden rounded bg-black/[.6] text-white">
			<slot />
		</div>
	</div>
</MediaQuery>
