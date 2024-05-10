<script>
	import '../app.css';
	import { onMount } from 'svelte';

	onMount(() => {
		// setup jdenticon programmatically -> module needed for picker (data-jdenticon-value cant be used with nodejs module)
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/jdenticon@3.2.0/dist/jdenticon.min.js';
		script.async = true;
		script.integrity = 'sha384-yBhgDqxM50qJV5JPdayci8wCfooqvhFYbIKhv0hTtLvfeeyJMJCscRfFNKIxt43M';
		script.crossOrigin = 'anonymous';
		document.head.appendChild(script);
		window['jdenticon_config'] = { replaceMode: 'observe' };
	});
</script>

<div class="flex h-[100vh] w-[100vw] items-center justify-center bg-gray-800">
	<slot />
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

	:global(body) {
		font-family: 'Press Start 2P', system-ui;
	}
</style>
