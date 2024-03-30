<script lang="ts">
	export let disabled: boolean = false
	export let onClick: () => void = () => {}
	export let onMouseOver: () => void = () => {}
	export let onMouseLeave: () => void = () => {}
</script>

<button
	on:focus={onMouseOver}
	on:mouseover={onMouseOver}
	on:mouseleave={onMouseLeave}
	on:click={onClick}
	{disabled}
	class="active:enabled::shadow-none disabled m-1 inline-flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded border-gray-700 bg-gray-600/60 px-3.5 py-2 text-xl text-white shadow-lg hover:from-gray-600 hover:to-gray-600/50 enabled:border-b-4 enabled:border-l-2 hover:enabled:bg-gradient-to-t active:enabled:border-gray-600 disabled:bg-gray-800/60">
	<slot />
</button>
