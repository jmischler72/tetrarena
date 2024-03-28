<script lang="ts">
    import {page} from '$app/stores';
    import {afterNavigate, goto} from "$app/navigation";
    import {leaveRoom} from "$lib/functions/services/RoomService";

    let previousPage: string = '/'
    afterNavigate(({from}) => {
        previousPage = from?.url.pathname || previousPage;
    })
</script>

<div class="bg-black/[.6]">
    <nav class="h-[100px] flex text-gray-200 bg-gray-700/75 rounded text-5xl justify-center items-center bg-none overflow-hidden z-10 animation">
        <div class="w-1/3 flex justify-center">
            {#if $page.url.pathname.split('/')[1] === 'game'}
                <button class="!text-3xl cursor-pointer items-center flex group"
                        class:animation-left={previousPage === '/'}
                        on:click={()=>leaveRoom()}>
                    <span class="translate-x-[-2px] group-hover:translate-x-[-6px] transition opacity-40">x</span>quit
                </button>

            {:else}
                <button class="!text-3xl cursor-pointer items-center flex group"
                        class:animation-left={previousPage === '/'}
                        on:click={()=>goto('/')}>
                    <span class="translate-x-[-2px] translate-y-[1px] group-hover:translate-x-[-6px] transition opacity-40">&#60;</span>back
                </button>
            {/if}
        </div>

        <div class="w-1/3 flex justify-center"
             class:animation-up={previousPage === '/'}
        >
            <h1 class="text-gray-200 text-3xl border-solid border-2 border-white p-1">tetrarena</h1>
        </div>
        <h1 class="w-1/3 text-3xl flex justify-center"
            class:animation-right={previousPage === '/'}
        >
            /{$page.url.pathname.split('/')[1]}
        </h1>
    </nav>
</div>

<style lang="scss">
  nav {
    font-family: 'Press Start 2P', system-ui;
  }

  $animation-duration: 0.45s;

  .animation-up {
    animation: $animation-duration ease-out translate_up forwards, $animation-duration ease-out opacityin forwards;
  }

  .animation-left {
    animation: $animation-duration ease-out translate_left forwards, $animation-duration ease-out opacityin forwards;
  }

  .animation-right {
    animation: $animation-duration ease-out translate_right forwards, $animation-duration ease-out opacityin forwards;
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