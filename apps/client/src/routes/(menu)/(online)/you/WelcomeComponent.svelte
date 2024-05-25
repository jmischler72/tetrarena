<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';

	export let currentMenu: string;
</script>

<MenuContainer>
	<div class="flex h-full w-full flex-col items-center justify-center gap-10 p-8">
		<h1 class="rounded-md border-2 border-solid border-white p-1 text-xl">Welcome to Tetrarena !</h1>
		<div class="w-[30%]">
			<Button onClick={() => (currentMenu = 'register')}><h1>Create a new account</h1></Button>
		</div>
		<div class="flex flex-col items-center gap-4">
			<h2>Or if you already have an account</h2>
			<div class="w-[30%]">
				<Button customStyle={'!text-sm'} onClick={() => (currentMenu = 'login')}><h1>Login</h1></Button>
			</div>
		</div>
	</div>
</MenuContainer>
<MenuFooter></MenuFooter>
