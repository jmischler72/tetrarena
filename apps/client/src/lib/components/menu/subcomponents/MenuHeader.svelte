<script>
	export let isSubmenu = false;
</script>

<div
	class="h-[10%] min-h-[10%] {isSubmenu
		? 'text-md bg-gray-800/75 '
		: 'bg-gray-700/75 text-2xl'} flex items-center gap-6 px-10 py-2"
>
	<slot />
</div>
