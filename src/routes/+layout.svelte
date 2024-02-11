<script>
    import "../app.css";
    import GridBackground from "./GridBackground.svelte";
    import Navbar from "./Navbar.svelte";
    import {page} from "$app/stores";
</script>


<div class="flex flex-col bg-gray-800 h-[100vh] overflow-hidden items-center">
    {#if $page.url.pathname !== '/game'}
        <Navbar></Navbar>
    {/if}
    <div class="main relative">
        <div class="absolute w-full">
            <GridBackground></GridBackground>
        </div>
        <slot/>
    </div>
</div>


<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  .main {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

</style>