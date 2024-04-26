<script>
  export let isSubmenu = false;
</script>
<div
  class="min-h-[10%] h-[10%] {isSubmenu ? 'bg-gray-800/75 text-md ' : 'bg-gray-700/75 text-2xl'} px-10 py-2 gap-6 items-center flex"
>
  <slot />
</div>