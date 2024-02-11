<script>
    import "../app.css";
    import {page} from '$app/stores';
    import {goto} from "$app/navigation";
    import GridBackground from "./GridBackground.svelte";

    $: console.log($page.url.pathname);
</script>

<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>

<div class="flex flex-col bg-gray-800 h-[100vh] overflow-hidden items-center">
    {#if $page.url.pathname !== '/'}
        <nav class=" h-[100px] flex text-gray-200 text-5xl justify-center items-end mt-16 pb-4 pt-10 bg-none overflow-hidden relative z-10 animation">
            <h1 class="title">tetrarena</h1>
            <button class="absolute left-[200px] bottom-0 text-3xl mb-4 cursor-pointer animation-text" on:click={()=>goto('/')}><span
                    class="material-symbols-outlined !text-[60px] arrow">chevron_left</span>back
            </button>


            <h1 class="absolute right-[200px] bottom-0 text-3xl mb-4 animation-text">
                {$page.url.pathname}
            </h1>
        </nav>
    {:else}
        <nav class="w-auto px-8 h-[100px] flex text-gray-200 text-5xl justify-center items-end mt-16 pb-4 pt-10 bg-none overflow-hidden relative z-10">
            <h1 class="title">tetrarena</h1>

        </nav>

    {/if}

    <div class="main relative ">
        <div class="absolute w-full">
            <GridBackground></GridBackground>
        </div>
        <slot/>
    </div>
</div>


<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  nav {
    font-family: 'Press Start 2P', system-ui;
  }

  .animation {
    animation: 0.4s ease-out slidein forwards;
  }

  .animation-text {
    animation: 0.4s ease-out opacityin forwards;
  }
  
  @keyframes opacityin {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slidein {
    from {
      width: 80%;
    }
    to {
      width: 100%;
    }
  }

  .title {
    border: 2px solid white;
    padding: 2px;
  }

  .arrow {
    transform: translate(0, 10px);
  }


  .main {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }

</style>