<script>
  import Menu from '$lib/components/menu/Menu.svelte';
  import { snackbarStore } from '$lib/stores/snackbarStore';

  $: if ($snackbarStore) setTimeout(() => ($snackbarStore = ''), 3000);

</script>

<Menu>
  <slot />
</Menu>
<div class='w-[40%] flex justify-center rounded-lg absolute bottom-10 right-10 bg-gray-800/65 transition p-2 z-30'
     class:opacity-0={$snackbarStore === ''}
>
  <div
    class='w-full h-full flex justify-center rounded border-2 border-solid border-gray-600  py-8  '
  >
    <h1 class='text-gray-300'>{$snackbarStore}</h1>
  </div>

</div>

