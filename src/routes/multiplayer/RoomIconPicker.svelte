<script lang="ts">
    export let selectedIcon: number = 0;
    export let randomString: string = '';
    //
    // let r = (Math.random() + 1).toString(36).substring(2);
    // console.log("random", r);
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/jdenticon@3.2.0/dist/jdenticon.min.js" async
            integrity="sha384-yBhgDqxM50qJV5JPdayci8wCfooqvhFYbIKhv0hTtLvfeeyJMJCscRfFNKIxt43M"
            crossorigin="anonymous">
    </script>
</svelte:head>

<div class="bg-gray-600 p-4 rounded-lg grid-container" id="identiconPlaceholder">
    {#each {length: 9} as _, i}
        {#if randomString !== ''}
            <button on:click={()=> selectedIcon = i}>
                <svg class="box-border bg-white border-gray-800"
                     class:border-4={selectedIcon === i} class:hover:border-2={!(selectedIcon === i)} width="80"
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