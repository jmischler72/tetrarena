<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';

	export let currentMenu: string;
</script>

<MenuContainer>
	<div class="flex h-full w-full flex-col items-center justify-center gap-10 p-8">
		<h1 class="text-xl">Welcome to Tetrarena !</h1>
		<h2 class="text-center">
			You are currently connected as a guest. If you would like to customise your profile and access more functionality,
			register a new account or login to an existing one.
		</h2>
		<div class="flex w-full flex-row px-12">
			<Button onClick={() => (currentMenu = 'register')}><h1>Register</h1></Button>
			<Button onClick={() => (currentMenu = 'login')}><h1>Login</h1></Button>
		</div>
	</div>
</MenuContainer>
<MenuFooter></MenuFooter>
