<script lang="ts">
	export let label: string;
	export let value: any;
	export let checked: boolean = false;
	export let type: 'text' | 'checkbox' | 'number' | 'password' = 'text';

	function toLowerSnakeCase(input: string): string {
		return input
			.replace(/\s+/g, '_') // Replace whitespace with underscores
			.replace(/([A-Z])/g, (match) => '_' + match.toLowerCase()) // Convert camel case to snake case
			.toLowerCase(); // Convert to lower case
	}

	function handleChange(e: any) {
		if (type === 'checkbox') {
			checked = e.target.checked;
		}
	}

	const id = toLowerSnakeCase(label);
</script>

<div
	class="flex w-[70%] {type !== 'checkbox'
		? 'flex-col'
		: 'flex-row'} items-center justify-center gap-x-8 gap-y-4 rounded-lg bg-gray-700/75 px-10 py-6 transition duration-500 ease-in-out"
>
	<label class="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for={id}>
		{label}
	</label>
	<input
		bind:value
		on:change={handleChange}
		{...{ type }}
		class="border-input flex h-10 {type !== 'checkbox'
			? 'w-full'
			: 'w-[25px]'} rounded-md border bg-gray-800 px-3 py-2 text-center text-sm text-white checked:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		{id}
	/>
</div>
