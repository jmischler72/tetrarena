<script lang="ts">
    let selected = 0;
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/jdenticon@3.2.0/dist/jdenticon.min.js" async
            integrity="sha384-yBhgDqxM50qJV5JPdayci8wCfooqvhFYbIKhv0hTtLvfeeyJMJCscRfFNKIxt43M"
            crossorigin="anonymous">
    </script>
</svelte:head>

<div class="bg-gray-600 p-4 rounded-lg grid-container" id="identiconPlaceholder">
    {#each {length: 9} as _, i}
        <button on:click={()=> selected = i} class=" box-border m-2 h-auto w-auto border-black"
                class:border-4={selected === i} class:hover:border-2={!(selected === i)}>
            <svg class="bg-white" width="80" height="80" data-jdenticon-value="John{i}"></svg>

        </button>
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