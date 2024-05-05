<script lang="ts">
	import { userStore } from '$lib/stores/MultiplayerStore';
	import { onValue, ref } from 'firebase/database';

	// const userRef = ref(db, 'users/' + $userStore?.uid);

	let username = '';
</script>

<div class="animation-up relative flex h-full w-full flex-col items-center justify-center gap-4">
	<div
		class="flex w-[70%] flex-col items-center justify-center gap-x-8 gap-y-4 rounded-lg bg-gray-700/75 px-2 py-6 transition duration-500 ease-in-out"
	>
		<label class="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="username">
			Username
		</label><input
			class="border-input flex h-10 w-[80%] rounded-md border bg-gray-800 px-3 py-2 text-center text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			id="username"
			bind:value={username}
		/>
	</div>
</div>
