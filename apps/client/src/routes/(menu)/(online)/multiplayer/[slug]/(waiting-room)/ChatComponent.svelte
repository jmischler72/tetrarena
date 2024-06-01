<script lang="ts">
	import { MessageTypeEnum } from '@jmischler72/shared';
	import { roomStore } from '$lib/stores/MultiplayerStore';

	let messages: { username: string; message: string }[] = [];

	let message = '';

	function sendMessage(msg: string) {
		$roomStore?.send(MessageTypeEnum.MESSAGE, msg.substring(0, 50));
		message = '';
	}

	$roomStore?.onMessage(MessageTypeEnum.MESSAGE, (message) => {
		messages = [...messages, message];
	});
</script>

<div class="relative flex h-full flex-col items-center justify-start rounded border-4 border-solid border-gray-600 p-4">
	<div class="h-full w-full overflow-y-scroll rounded bg-gray-800">
		<div class="flex w-full flex-col gap-2 rounded p-4">
			{#each messages as message}
				<div class="flex w-full flex-row justify-start rounded bg-gray-700 px-4 py-4 text-xs">
					<h1 class="[overflow-wrap:anywhere]">{message.username}: {message.message}</h1>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-row">
		<input
			type="text"
			bind:value={message}
			placeholder="Type your message here..."
			class="w-full rounded bg-gray-600 p-2 text-xs text-white"
			on:keydown={(e) => e.key === 'Enter' && sendMessage(message)}
		/>
		<button on:click={() => sendMessage(message)} class="ml-2 rounded bg-blue-500 px-4 py-2 text-xs text-white"
			>Send</button
		>
	</div>
</div>
