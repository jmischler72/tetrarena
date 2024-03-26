<script>
    import {page} from '$app/stores';
    import {goto} from "$app/navigation";
</script>

<nav class="h-[100px] flex text-gray-200 text-5xl justify-center items-center bg-none overflow-hidden z-10 animation">
    <button class="w-1/3 text-3xl cursor-pointer animation-left "
            on:click={()=>goto('/')}>
        &#60;back
    </button>
    <div class="w-1/3 flex justify-center animation-up">
        <h1 class="text-gray-200 text-3xl border-solid border-2 border-white p-1">tetrarena</h1>
    </div>
    <h1 class="w-1/3 text-3xl animation-right flex justify-center">
        /{$page.url.pathname.split('/')[1]}
    </h1>
</nav>

<style lang="scss">

  :global(body) {
    --animation-duration: 0.45s
  }

  nav {
    font-family: 'Press Start 2P', system-ui;
  }

  .animation-up {
    animation: var(--animation-duration) ease-out translate_up forwards, var(--animation-duration) ease-out opacityin forwards;
  }

  .animation-left {
    animation: var(--animation-duration) ease-out translate_left forwards, var(--animation-duration) ease-out opacityin forwards;
  }

  .animation-right {
    animation: var(--animation-duration) ease-out translate_right forwards, var(--animation-duration) ease-out opacityin forwards;
  }

  @keyframes translate_up {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes translate_left {
    from {
      transform: translateX(40px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes translate_right {
    from {
      transform: translateX(-40px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes opacityin {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }


</style>