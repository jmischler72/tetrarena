<script lang="ts">
    export let selectedIcon: number = 0;
    export let randomString: string = '';
</script>

<div class="bg-gray-600 p-4 rounded-lg grid-container" id="identiconPlaceholder">
    {#each {length: 9} as _, i}
        {#if randomString !== ''}
            <button on:click={()=> selectedIcon = i}>
                <svg class="box-border  bg-white border-gray-700"
                     class:border-4={selectedIcon === i} class:hover:border-4={!(selectedIcon === i)} width="80"
                     height="80" data-jdenticon-value="{randomString + i}"></svg>
            </button>
        {/if}
    {/each}
</div>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 15px;
    }
</style>