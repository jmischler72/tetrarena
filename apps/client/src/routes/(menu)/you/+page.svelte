<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import LoginForm from './LoginForm.svelte';
	import RegisterForm from './RegisterForm.svelte';
	import UserForm from './ProfileComponent.svelte';
	import { auth } from '$lib/functions/services/FirebaseClient';
	import WelcomeComponent from './WelcomeComponent.svelte';

	let currentMenu = auth.currentUser?.isAnonymous ? 'welcome' : 'profile';
</script>

<MenuHeader>
	{#if auth.currentUser?.isAnonymous}
		<MenuButtonHeader
			on:click={() => (currentMenu = 'welcome')}
			text="Welcome"
			icon="waving_hand"
			selected={currentMenu === 'welcome'}
		></MenuButtonHeader>
	{/if}
	{#if auth.currentUser && !auth.currentUser.isAnonymous}
		<MenuButtonHeader
			on:click={() => (currentMenu = 'profile')}
			text="Profile"
			icon="account_circle"
			selected={currentMenu === 'profile'}
		></MenuButtonHeader>
	{/if}
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

{#if currentMenu === 'profile'}
	<UserForm></UserForm>
{:else if currentMenu === 'welcome'}
	<MenuContainer>
		<WelcomeComponent bind:currentMenu></WelcomeComponent>
	</MenuContainer>
{:else if currentMenu === 'login'}
	<LoginForm></LoginForm>
{:else if currentMenu === 'register'}
	<RegisterForm></RegisterForm>
{/if}

{#if currentMenu === 'welcome'}
	<MenuFooter></MenuFooter>
{/if}
