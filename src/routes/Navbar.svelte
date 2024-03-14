<script>
    import {page} from '$app/stores';
    import {goto} from "$app/navigation";
</script>

{#if $page.url.pathname !== '/'}
    <nav class="h-[100px] flex text-gray-200 text-5xl justify-center items-end mt-16 pb-4 pt-10 bg-none overflow-hidden relative z-10 animation">
        <h1 class="title">tetrarena</h1>
        <button class="absolute left-[200px] bottom-0 text-3xl mb-4 cursor-pointer animation-text"
                on:click={()=>goto('/')}><span
                class="material-symbols-outlined !text-[60px] arrow">chevron_left</span>back
        </button>


        <h1 class="absolute right-[200px] bottom-0 text-3xl mb-4 animation-text">
            /{$page.url.pathname.split('/')[1]}
        </h1>
    </nav>
{:else}
    <nav class="w-auto px-8 h-[100px] flex text-gray-200 text-5xl justify-center items-end mt-16 pb-4 pt-10 bg-none overflow-hidden relative z-10">
        <h1 class="title">tetrarena</h1>
    </nav>
{/if}

<style lang="scss">
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

</style>