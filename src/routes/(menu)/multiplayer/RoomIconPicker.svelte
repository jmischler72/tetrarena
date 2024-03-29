<script lang="ts">
    export let selectedIcon: number = 0;
    export let randomString: string = '';
    export let roomIconPickerOpen: boolean;

    const ICON_SIZE = 120

</script>

<div class="rounded-lg grid grid-cols-1 gap-y-4 gap-x-8">
    {#each {length: 24} as _, i}
        {#if randomString !== ''}
            <button on:click={()=> {
                selectedIcon = i
                roomIconPickerOpen = false;
            }}>
                <svg class="box-border  bg-white border-gray-700"
                     class:border-4={selectedIcon === i} class:hover:border-4={!(selectedIcon === i)} width="{ICON_SIZE}"
                     height="{ICON_SIZE}" data-jdenticon-value="{randomString + i}"></svg>
            </button>
        {/if}
    {/each}
</div>
