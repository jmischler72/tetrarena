<script lang="ts">
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import Input from '$lib/components/Input.svelte';
	import { getUserInfos } from '$lib/functions/services/FirebaseService';
	import { auth } from '$lib/functions/services/FirebaseClient';
	import { onMount } from 'svelte';

	async function getInfos() {
		userInfos = await getUserInfos();
	}
	let userInfos = {};

	$: console.log(userInfos);

	onMount(() => {
		console.log(auth);
	});
</script>

{#if auth.currentUser?.isAnonymous}
	Anonymous
{/if}
<AsyncMenu callback={() => getInfos()}>
	<div class="animation-up relative flex h-full w-full flex-col items-center justify-center gap-4">
		<!-- <Input bind:value={username} label={'Username'} /> -->
	</div>
</AsyncMenu>
