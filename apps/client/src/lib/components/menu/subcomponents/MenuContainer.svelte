<script>
	export let hasFooter = false;
</script>

<div class="flex h-full items-start" class:max-h-[72%]={hasFooter}>
	<slot />
</div>
