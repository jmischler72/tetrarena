<script lang="ts">
    import type {Menu} from "./Menu";
    export let menu: Menu;

</script>

<button on:click class="flex h-full px-4 flex-row items-center gap-x-4 rounded-lg {menu.selected? 'bg-gray-600/60' : ''}">
    <i class="material-symbols-outlined">{menu.icon}</i>
    <span class="text-2xl font-semibold text-md">{menu.text}</span>
</button>
