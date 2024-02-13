<script lang="ts">
    import type {Menu} from "./Menu";

    export let menus: Menu[];
</script>
<div class="w-full h-[10%] bg-gray-700 pl-10 items-center flex gap-6">
    {#each menus as menu}
        <div class="flex h-full px-4 flex-row items-center gap-4 rounded-lg "
             class:bg-gray-600={menu.selected}>
            <i class="material-symbols-outlined">{menu.icon}</i>
            <h1 class="text-2xl font-semibold text-md">{menu.text}</h1>
        </div>
    {/each}
</div>