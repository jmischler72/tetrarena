<script>
    import Button from "$lib/components/Button.svelte";
</script>

<div class="flex flex-col bg-black/[.6] text-white rounded h-full w-full z-10 overflow-hidden justify-between">
    <div class="min-h-[10%]">
        <slot name="header"/>
    </div>
    <div class="max-h-[72%] mb-auto">
        <slot/>
    </div>
    <div class="min-h-[18%] w-full">
        <slot name="footer"/>
    </div>
</div>
