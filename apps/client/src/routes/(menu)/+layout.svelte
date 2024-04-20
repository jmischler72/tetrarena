<script>
  import Menu from '$lib/components/menu/Menu.svelte';
  import Snackbar from './Snackbar.svelte';


</script>

<Menu>
  <slot />
</Menu>
<Snackbar></Snackbar>


