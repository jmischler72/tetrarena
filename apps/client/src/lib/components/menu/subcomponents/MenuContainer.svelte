<script>
    export let hasFooter = false;
</script>

<div class="h-full flex items-start"
     class:max-h-[72%]={hasFooter}>
    <slot/>
</div>
