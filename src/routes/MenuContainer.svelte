<script>
    import MenuHeader from "./MenuHeader.svelte";

    export let menuInfo;
</script>

<div class="card h-[90%] w-[90%] z-10 overflow-hidden">
    <MenuHeader menuText="{menuInfo[0]}" menuIcon="{menuInfo[1]}"></MenuHeader>
    <div class="p-4">
        <slot></slot>
    </div>
</div>

<style lang="scss">
  .card {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    color: white;
  }
</style>