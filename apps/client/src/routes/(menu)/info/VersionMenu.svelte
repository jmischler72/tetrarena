<script lang="ts">
	import {onMount} from 'svelte'


	let serverUrl = import.meta.env.VITE_BACKEND_URL + "/version";

	let clientVersion = __APP_VERSION__;
	let serverVersion = "offline";
	onMount(() => {
		fetch(serverUrl)
				.then(res => res.json())
				.then(data => serverVersion = data.version)
	});
</script>

<div class="flex h-full w-full flex-col space-y-4 overflow-y-scroll p-6">
	<div class="flex flex-col text-xl">
		<h1>client - {clientVersion}</h1>
		<h1>server - {serverVersion}</h1>
	</div>
</div>
