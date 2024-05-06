<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import { onMount } from 'svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import Button from '$lib/components/Button.svelte';
	import LoginForm from './LoginForm.svelte';
	import UserForm from './UserForm.svelte';

	let currentMenu = 'profile';

	onMount(() => {});
</script>

<MenuHeader>
	<MenuButtonHeader
		on:click={() => (currentMenu = 'profile')}
		text="Profile"
		icon="account_circle"
		selected={currentMenu === 'profile'}
	></MenuButtonHeader>
	<MenuButtonHeader
		on:click={() => (currentMenu = 'login')}
		text="Login"
		icon="login"
		selected={currentMenu === 'login'}
	></MenuButtonHeader>
	<MenuButtonHeader
		on:click={() => (currentMenu = 'register')}
		text="Register"
		icon="badge"
		selected={currentMenu === 'register'}
	></MenuButtonHeader>
</MenuHeader>
<MenuContainer>
	{#if currentMenu === 'profile'}
		<UserForm></UserForm>
	{:else}
		<LoginForm></LoginForm>
	{/if}
</MenuContainer>

<MenuFooter>
	<div class="h-[60%] w-[30%]">
		<Button onClick={() => console.log('d')}>Login</Button>
	</div>
</MenuFooter>
