<script lang="ts">
	import AsyncMenu from '$lib/components/menu/AsyncMenu.svelte';
	import { getLeaderboard } from '$lib/functions/services/FirebaseService';

	let users: { username: string; rank: number }[] = [];

	async function getUsers() {
		users = await getLeaderboard();
	}
</script>

<AsyncMenu callback={() => getUsers()}>
	<div class="h-full w-full p-4 text-white">
		<div class="h-full overflow-y-scroll rounded border-2 border-solid border-gray-600">
			<table class="w-full caption-bottom pl-10 text-sm">
				<thead class="[&amp;_tr]:border-b bg-gray-700">
					<tr class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
						<th
							class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-center align-middle font-medium"
						>
							n°
						</th>
						<th
							class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-center align-middle font-medium"
						>
							Username
						</th>
						<th
							class="text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-center align-middle font-medium"
						>
							Rank
						</th>
					</tr>
				</thead>
				<tbody class="[&amp;_tr:last-child]:border-0">
					{#each users as user, key}
						<tr
							class="cursor-pointer border-b transition-colors hover:bg-gray-600 {key === 0
								? 'bg-yellow-600/50'
								: ''} {key === 1 ? 'bg-zinc-500/50' : ''} {key === 2 ? 'bg-orange-700/50' : ''}"
						>
							<td class="[&amp;:has([role=checkbox])]:pr-0 p-4 py-8 text-center align-middle font-medium">{key + 1}</td>
							<td class="[&amp;:has([role=checkbox])]:pr-0 p-4 py-8 text-center align-middle font-medium"
								>{user.username}</td
							>
							<td class="[&amp;:has([role=checkbox])]:pr-0 p-4 py-8 text-center align-middle font-medium"
								>{user.rank}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</AsyncMenu>
