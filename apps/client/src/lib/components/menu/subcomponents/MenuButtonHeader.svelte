<script lang="ts">
    export let icon: string;
    export let text: string;
    export let selected: boolean;

</script>

<button on:click class="flex h-full px-4 flex-row items-center gap-x-4 rounded-lg {selected? 'bg-gray-600/60' : ''}">
    <i class="material-symbols-outlined">{icon}</i>
    <span class="text-2xl font-semibold text-md">{text}</span>
</button>
