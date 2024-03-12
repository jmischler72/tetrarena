<script>
    import "../app.css";
    import GridBackground from "./GridBackground.svelte";
    import Navbar from "./Navbar.svelte";
    import {inGame} from "./controlsStore";
</script>

{#if !$inGame}
    <div class="flex flex-col bg-gray-800 h-[100vh] overflow-hidden items-center">
        <Navbar></Navbar>
        <div class="main relative">
            <div class="absolute w-full">
                <GridBackground></GridBackground>
            </div>
            <slot/>
        </div>
    </div>
{:else}
    <slot/>
{/if}

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  :global(body){
    font-family: 'Press Start 2P', system-ui;
  }

  .main {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

</style>