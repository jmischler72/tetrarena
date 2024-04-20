<script>
import { snackbarStore } from '$lib/stores/snackbarStore';

$: message = $snackbarStore !== '' ? $snackbarStore: message
$: if ($snackbarStore) setTimeout(() => ($snackbarStore = ''), 3000);

</script>

<div class='w-[40%] flex justify-center rounded-lg absolute bottom-10 right-10 bg-gray-800 transition p-2 z-30'
     class:opacity-0={$snackbarStore === ''}
>
  <div
    class='w-full h-full flex justify-center rounded border-2 border-solid border-gray-600  py-8  '
  >
    <h1 class='text-white'>{message}</h1>
  </div>

</div>