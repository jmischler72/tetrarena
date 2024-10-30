<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import ThreeBg from './ThreeBg.svelte';
	import Analytics from '$lib/components/google/Analytics.svelte';

	onMount(() => {
		// setup jdenticon programmatically -> module needed for picker (data-jdenticon-value cant be used with nodejs module)
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/jdenticon@3.2.0/dist/jdenticon.min.js';
		script.async = true;
		script.integrity = 'sha384-yBhgDqxM50qJV5JPdayci8wCfooqvhFYbIKhv0hTtLvfeeyJMJCscRfFNKIxt43M';
		script.crossOrigin = 'anonymous';
		document.head.appendChild(script);
		// @ts-expect-error: Should expect type is not number
		window['jdenticon_config'] = { replaceMode: 'observe' };
	});
</script>

<Analytics />

<div class="flex h-[100vh] w-[100vw] items-center justify-center bg-gray-800/75">
	<slot />
</div>
<div class="pointer-events-none absolute left-0 top-0 z-[-1] h-[100vh] w-[100vw] overflow-hidden bg-gray-900">
	<ThreeBg></ThreeBg>
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

	:global(body) {
		font-family: 'Press Start 2P', system-ui;
	}
</style>
