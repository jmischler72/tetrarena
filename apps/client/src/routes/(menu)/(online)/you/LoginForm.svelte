<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import { auth } from '$lib/functions/services/FirebaseClient';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let email = '';
	let password = '';
	let error = '';
</script>

<MenuContainer>
	<div class="animation-up relative flex h-full w-full flex-col items-center justify-center gap-4">
		<Input bind:value={email} label={'Email'} />
		<Input bind:value={password} label={'Password'} type={'password'} />
		{#if error}
			<div
				class="mx-6 flex h-[15%] w-[70%] items-center justify-center rounded-lg bg-gray-600/50 transition duration-500 ease-in-out"
			>
				<h1>{error}</h1>
			</div>
		{/if}
	</div>
</MenuContainer>
<MenuFooter>
	<div class="h-[60%] w-[30%]">
		<Button
			onClick={() =>
				signInWithEmailAndPassword(auth, email, password)
					.then(() => location.reload())
					.catch((e) => (error = e))}>Login</Button
		>
	</div>
</MenuFooter>
