<script lang="ts">
    export let disabled: boolean = false;
    export let onClick: () => void = () => {};
</script>
<button
        on:click={onClick}
        disabled={disabled}
        class="w-full h-full text-xl m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded enabled:border-b-4 enabled:border-l-2 border-gray-700 bg-gray-600/60 hover:enabled:bg-gradient-to-t hover:from-gray-600 hover:to-gray-600/50 px-3.5 py-2 text-white shadow-lg active:enabled:border-gray-600 active:enabled::shadow-none disabled:bg-gray-800/60 disabled">
    <slot/>
</button>
