<script lang="ts">
    import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";

    export let callback: () => Promise<Response> | Promise<void>;
</script>

{#await callback()}
    <div class="w-full h-full flex justify-center items-center">
        <LoadingSpinner/>
    </div>
{:then _}
    <slot/>
{:catch _}
    <div class="w-full h-full flex justify-center items-center text-2xl">
        <h1>Connection Error... <a class="p-1 rounded bg-white text-black no-underline" href="/"
                                   on:click={()=>location.reload()}>Try Again</a></h1>
    </div>
{/await}