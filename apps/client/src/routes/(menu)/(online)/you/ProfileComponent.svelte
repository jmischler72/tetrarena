<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { setUserInfos } from '$lib/functions/services/FirebaseService';
	import { zUser, type User } from '@jmischler72/shared';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import Button from '$lib/components/Button.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import { userStore } from '$lib/stores/MultiplayerStore';

	function updateUser() {
		zUser.parse(userInfos);
		setUserInfos(userInfos);
	}

	let userInfos = structuredClone($userStore);

	$: isSaved = JSON.stringify($userStore) === JSON.stringify(userInfos);
</script>

<MenuContainer>
	{#if userInfos}
		<div class="animation-up relative flex h-full w-full flex-col items-center justify-center gap-4">
			<Input bind:value={userInfos.username} label={'Username'} />
		</div>
	{/if}
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
