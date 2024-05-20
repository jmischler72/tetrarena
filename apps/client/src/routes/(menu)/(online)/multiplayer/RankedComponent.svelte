<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import { getUserInfos } from '$lib/functions/services/FirebaseService';
	import type { UserInfos } from '@jmischler72/shared';

	let userInfos: UserInfos | null = null;

	async function initialiseUserInfos() {
		userInfos = await getUserInfos();
	}
</script>

<MenuContainer>
	<AsyncMenu callback={() => initialiseUserInfos()}>
		<div class="flex h-full w-full items-center justify-center">
			{#if userInfos}
				<div
					class="flex w-[70%] flex-row items-center justify-center gap-x-8 rounded-lg bg-gray-700/75 px-2 py-6 transition duration-500 ease-in-out"
				>
					<h1>{userInfos.username}</h1>
				</div>
			{/if}
		</div>
	</AsyncMenu>
</MenuContainer>
<MenuFooter>
	<div class="h-[60%] w-[30%]">
		<Button onClick={() => {}}>Search game</Button>
	</div>
</MenuFooter>
