<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import Button from '$lib/components/Button.svelte';

	let currentMenu = 'about';
	let appVersion = __APP_VERSION__;

	let server = import.meta.env.VITE_SERVER_URL || 'offline';
</script>

<MenuHeader>
	<MenuButtonHeader
		on:click={() => (currentMenu = 'about')}
		text="About"
		icon="info"
		selected={currentMenu === 'about'}
	/>
</MenuHeader>
<MenuContainer>
	<div class="flex h-full w-full flex-col items-center gap-8 pt-10">
		<h1 class="text-gray-200">tetrarena v{appVersion}</h1>
		<hr class="h-2 w-[80%] border-t-2 border-white" />

		<h1 class="text-xl">
			Made by <span><a class=" hover:underline" href="https://github.com/jmischler72">@jmischler72</a></span> with Svelte,
			Pixi and Colyseus
		</h1>
		<p>
			If you find any bug, you can report them here:
			<span class="cursor-pointer text-gray-200 hover:underline"
				><a class=" hover:underline" href="https://github.com/jmischler72/tetrarena-issues/issues/new/choose"
					>github/tetrarena-issues</a
				></span
			>
			<br />
		</p>
		<p>Connected to server - {server}</p>
	</div>
</MenuContainer>

<MenuFooter>
	<div class="h-[60%] w-full">
		<Button
			onClick={() => {
				window.location.href = 'https://www.patreon.com/jmischler72';
			}}>my patreon🥸</Button
		>
	</div>
</MenuFooter>
