<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import Button from '$lib/components/Button.svelte';

	let currentMenu = 'about';
	let appVersion = __APP_VERSION__;
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
	<div class="flex h-full w-full flex-col items-center justify-center gap-4">
		<h1 class="text-xl">
			Made by <span><a class=" hover:underline" href="https://github.com/jmischler72">@jmischler72</a></span>
		</h1>
		<h1>With Svelte, Pixi and Colyseus</h1>
		<h1 class="text-gray-200">v{appVersion}</h1>
	</div>
</MenuContainer>

<MenuFooter>
	<div class="h-[60%] w-full">
		<Button
			onClick={() => {
				window.location.href = 'https://ko-fi.com/tetrarena';
			}}>If you'd like to tip me</Button
		>
	</div>
</MenuFooter>
