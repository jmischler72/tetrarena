<script lang="ts">
	import { roomStateStore, roomStore } from '$lib/stores/MultiplayerStore';
	import MenuContainer from '$lib/components/menu/subcomponents/MenuContainer.svelte';
	import MenuHeader from '$lib/components/menu/subcomponents/MenuHeader.svelte';
	import WaitingComponent from './WaitingComponent.svelte';
	import MenuFooter from '$lib/components/menu/subcomponents/MenuFooter.svelte';
	import Button from '$lib/components/Button.svelte';
	import { MessageTypeEnum } from '@jmischler72/shared';
	import { onMount } from 'svelte';
	import CountdownTimer from './CountdownTimer.svelte';

	function playerReady() {
		$roomStore?.send(MessageTypeEnum.READY);
	}

	onMount(() => {
		roomStateStore.set($roomStore?.state || null);

		$roomStore?.onStateChange((state) => {
			roomStateStore.set(state);
		});

		return () => {
			$roomStore?.onStateChange.clear();
		};
	});
</script>

<MenuHeader>
	<div class="ml-auto mr-auto flex w-full justify-center text-2xl">
		<h1>Room - {$roomStore?.roomId}</h1>
	</div>
	<button
		on:click={() => $roomStore?.send(MessageTypeEnum.RESET_TIMEOUT)}
		class="absolute aspect-square w-16 cursor-pointer"
	>
		{#key $roomStateStore?.timeoutAt}
			<CountdownTimer sec={Math.ceil((($roomStateStore?.timeoutAt || Date.now()) - Date.now()) / 1000)}
			></CountdownTimer>
		{/key}
	</button>
</MenuHeader>
<MenuContainer hasFooter={true}>
	<WaitingComponent></WaitingComponent>
</MenuContainer>
<MenuFooter>
	<div class="w-[70%]">
		<Button onClick={() => playerReady()} disabled={$roomStateStore?.players.get($roomStore?.sessionId || '')?.ready}>
			{#if $roomStateStore?.players.get($roomStore?.sessionId || '')?.ready}
				<span class="translate-x-[-5px] translate-y-[-4px] text-green-100">&#10004;</span> Ready
			{:else}
				Ready
			{/if}
		</Button>
	</div>
</MenuFooter>
