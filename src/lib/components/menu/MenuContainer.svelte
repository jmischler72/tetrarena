<script>
    export let center = false;

</script>

<div class="min-h-[10%]">
    <slot name="header"/>
</div>
<div class="min-h-[72%] flex"
     class:items-center={center}>
    <slot/>
</div>
<div class="min-h-[18%] w-full">
    <slot name="footer"/>
</div>
