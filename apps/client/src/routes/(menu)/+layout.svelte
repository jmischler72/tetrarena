<script>
  import Menu from "$lib/components/menu/Menu.svelte";
  import Snackbar from "./Snackbar.svelte";


</script>

<Menu>
  <slot />
</Menu>
<Snackbar></Snackbar>

<style lang="scss">
  $animation-duration: 0.3s;

  :global(.animation-up) {
    animation: $animation-duration ease-out translate_up forwards, $animation-duration ease-out opacityin forwards;
  }


  @keyframes translate_up {
    from {
      transform: translateY(12px);
    }
    to {
      transform: translateY(0);
    }
  }

</style>


