<script lang="ts">
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuButtonHeader from '$lib/components/menu/subcomponents/MenuButtonHeader.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import Button from '$lib/components/Button.svelte';

	let currentMenu = 'about';
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
	<div class="flex h-full w-full items-center justify-center">
		<h1>Made by <span><a class=" hover:underline" href="https://github.com/jmischler72">@jmischler72</a></span></h1>
	</div>
</MenuContainer>

<MenuFooter>
	<div class="h-[60%] w-full">
		<Button onClick={() => {}}>Donate to help this project</Button>
	</div>
</MenuFooter>
