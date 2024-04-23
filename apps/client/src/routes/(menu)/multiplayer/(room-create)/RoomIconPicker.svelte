<script lang="ts">

  export let icon: string;
  export let roomIconPickerOpen: boolean;
  export let randomIcons: string[];


  const ICON_SIZE = 120;

</script>

<div class="rounded-lg grid grid-cols-1 gap-y-4 gap-x-8">
  {#each randomIcons as randomIcon}
    <button on:click={()=> {
                icon = randomIcon
                roomIconPickerOpen = false;
            }}>
      <svg class="box-border bg-white rounded border-gray-900"
           class:border-4={icon === randomIcon} class:hover:border-2={icon !== randomIcon} width="{ICON_SIZE}"
           height="{ICON_SIZE}" data-jdenticon-value="{randomIcon}"></svg>
    </button>
  {/each}
</div>
