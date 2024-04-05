<script lang="ts">
    import type {MenuButton} from "./MenuButton";
    export let button: MenuButton;

</script>

<button on:click class="flex h-full px-4 flex-row items-center gap-x-4 rounded-lg {button.selected? 'bg-gray-600/60' : ''}">
    <i class="material-symbols-outlined">{button.icon}</i>
    <span class="text-2xl font-semibold text-md">{button.text}</span>
</button>
