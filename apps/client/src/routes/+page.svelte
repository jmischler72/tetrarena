<script lang="ts">
	import Home from './Home.svelte';
</script>

<div class="relative flex h-[50%] w-full flex-col items-center gap-y-10 pb-4 lg:h-[70%]">
	<a class="border-2 border-solid border-white text-2xl text-gray-200 hover:underline lg:text-5xl" href="/info"
		>tetrarena</a
	>
	<Home></Home>
</div>

<footer class="absolute bottom-5 flex w-[98%] flex-row items-center justify-end gap-4 text-gray-500">
	<a class="text-lg hover:underline lg:text-2xl" href="https://www.youtube.com/@jmischler72-o5d">@jmischler72</a>
	<p class="text-lg lg:text-3xl">*</p>
	<a class="text-lg text-gray-300 hover:underline lg:text-xl" href="https://www.patreon.com/c/jmischler72"
		>help this project</a
	>
</footer>
