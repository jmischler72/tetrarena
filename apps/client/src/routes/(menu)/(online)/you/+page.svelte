<script lang="ts">
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import LoginForm from './LoginForm.svelte';
	import RegisterForm from './RegisterForm.svelte';
	import ProfileComponent from './ProfileComponent.svelte';
	import { auth } from '$lib/functions/services/FirebaseClient';
	import WelcomeComponent from './WelcomeComponent.svelte';
	import { userStore } from '$lib/stores/MultiplayerStore';

	let currentMenu = $userStore?.isAnonymous ? 'welcome' : 'profile';
</script>

{#if $userStore && !$userStore.isAnonymous}
	<MenuHeader>
		<div class="flex h-full w-full flex-row justify-between">
			<div class="flex flex-row">
				<MenuButtonHeader on:click={() => {}} text="Profile" icon="account_circle" selected={true}></MenuButtonHeader>
			</div>
			<MenuButtonHeader
				on:click={() => auth.signOut().then(() => (currentMenu = 'welcome'))}
				text={'Logout'}
				icon="logout"
				selected={false}
				customStyle="text-sm bg-gray-600/70"
			></MenuButtonHeader>
		</div>
	</MenuHeader>
	<ProfileComponent></ProfileComponent>
{:else}
	<MenuHeader>
		<MenuButtonHeader
			on:click={() => (currentMenu = 'welcome')}
			text="Welcome"
			icon="waving_hand"
			selected={currentMenu === 'welcome'}
		></MenuButtonHeader>
		{#if currentMenu === 'login'}
			<MenuButtonHeader
				on:click={() => (currentMenu = 'login')}
				text="Login"
				icon="login"
				selected={currentMenu === 'login'}
			></MenuButtonHeader>
		{/if}
		{#if currentMenu === 'register'}
			<MenuButtonHeader
				on:click={() => (currentMenu = 'register')}
				text="Register"
				icon="badge"
				selected={currentMenu === 'register'}
			></MenuButtonHeader>
		{/if}
	</MenuHeader>

	{#if currentMenu === 'welcome'}
		<WelcomeComponent bind:currentMenu></WelcomeComponent>
	{:else if currentMenu === 'login'}
		<LoginForm></LoginForm>
	{:else if currentMenu === 'register'}
		<RegisterForm></RegisterForm>
	{/if}
{/if}
