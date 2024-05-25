<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { getUserInfos, setUserInfos } from '$lib/functions/services/FirebaseService';
	import { zUserInfos, type UserInfos } from '@jmischler72/shared';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import Button from '$lib/components/Button.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import { formatZodIssue } from '$lib/functions/helpers/ZodHelper';
	import { z } from 'zod';
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';

	let error = '';
	async function updateUser() {
		try {
			zUserInfos.parse(userInfos);
			if (userInfos) await setUserInfos(userInfos);
			initialiseUserInfos();

			error = '';
		} catch (e) {
			error = e instanceof z.ZodError ? formatZodIssue(e.errors[0]) : (e as string);
		}
	}

	let userInfos: UserInfos | null;
	let initialInfos: UserInfos | null;

	async function initialiseUserInfos() {
		initialInfos = await getUserInfos();
		userInfos = structuredClone(initialInfos);
	}

	$: isSaved = JSON.stringify(initialInfos) === JSON.stringify(userInfos);
</script>

<MenuContainer>
	<AsyncMenu callback={() => initialiseUserInfos()}>
		{#if userInfos}
			<div class="animation-up relative flex h-full w-full flex-col items-center justify-center gap-4">
				<Input bind:value={userInfos.username} label={'Username'} />
				{#if error}
					<div
						class="mx-6 flex h-[15%] w-[70%] items-center justify-center rounded-lg bg-gray-600/50 transition duration-500 ease-in-out"
					>
						<h1>{error}</h1>
					</div>
				{/if}
			</div>
		{/if}
	</AsyncMenu>
</MenuContainer>

<MenuFooter>
	<div class="h-[60%] w-[30%]">
		<Button onClick={() => updateUser()} disabled={isSaved}>
			{#if isSaved}
				<span class="translate-x-[-5px] translate-y-[-4px] text-green-100">&#10004;</span> Saved
			{:else}
				Save
			{/if}
		</Button>
	</div>
</MenuFooter>
