<script lang="ts">
    import MenuHeader from "./MenuHeader.svelte";
    import type {Menu} from "./Menu";

    export let menus: Menu[];
</script>

<div class="flex flex-col card h-[90%] w-[80%] z-10 overflow-hidden">
    <MenuHeader menus="{menus}"></MenuHeader>
    <div class="h-full p-4">
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