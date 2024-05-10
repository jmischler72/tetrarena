<script lang="ts">
	import Input from '$lib/components/menu/Input.svelte';

	let username = '';
	let password = '';
</script>

<div class="animation-up relative flex h-full w-full flex-col items-center justify-center gap-4">
	<Input bind:value={username} label={'Username'} />
	<Input bind:value={password} label={'Password'} />
	<Input bind:value={password} label={'Remember Me'} type={'checkbox'} />
</div>
