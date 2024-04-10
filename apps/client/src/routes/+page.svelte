<script lang="ts">
    import Home from "./Home.svelte";
    import {onMount} from "svelte";

    let serverUrl = import.meta.env.VITE_BACKEND_URL + "/version";

    let clientVersion = __APP_VERSION__;
    let serverVersion = "offline";
    onMount(() => {
        fetch(serverUrl)
            .then(res => res.json())
            .then(data => serverVersion = data.version)
    });
</script>

<div class="h-[70%] w-[80%] lg:w-auto lg:aspect-square  flex flex-col gap-y-14 items-center pb-8">
    <h1 class="text-gray-200 text-2xl lg:text-5xl border-solid border-2 border-white p-1">tetrarena</h1>
    <Home></Home>
</div>

<footer class="w-[98%] absolute bottom-5 text-gray-500 flex flex-row gap-2 justify-between items-end">
    <div class="flex flex-col text-xl">
        <h1>client - {clientVersion}</h1>
        <h1>server - {serverVersion}</h1>
    </div>

    <a class="text-lg lg:text-3xl hover:underline" href="https://github.com/jmischler72">@jmischler72</a>
</footer>