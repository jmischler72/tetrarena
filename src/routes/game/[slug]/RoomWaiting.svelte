<script lang="ts">

    import {roomStore} from "$lib/stores/multiplayerStore";
    import MenuContainer from "$lib/components/menu-components/MenuContainer.svelte";
    import MenuHeader from "$lib/components/menu-components/MenuHeader.svelte";

    let players: string[] = [];

    $: $roomStore?.state.listen("players", (currentValue) => {
        players = Array.from(currentValue.keys());
    });
</script>

<MenuContainer>
    <MenuHeader slot="header">
        <div class="w-full text-2xl items-center justify-center flex">
            <h1>Room - {$roomStore?.roomId}</h1>
        </div>
<!--        <h2 class="absolute right-4 text-sm text-gray-300">Room - {$roomStore?.roomId}</h2>-->
    </MenuHeader>
    <div class="flex flex-col justify-center items-center gap-6 p-8">
        <h1>Waiting for players<span
                class="ani-ellipsis ani-ellipsis-jump"><span>.</span></span></h1>

        <div class="flex flex-col justify-center items-center">
            <ul class="list-none">
                {#each players as player}
                    <li class="p-2 rounded bg-gray-600">{player}</li>
                {/each}
            </ul>
        </div>
    </div>
</MenuContainer>

<style lang="scss">
  .ani-ellipsis {
    &:before, &:after {
      content: '.';
    }
  }

  @keyframes jump-animation {
    0% {
      top: 0;
    }
    30% {
      top: -0.125em;
    }
    60% {
      top: 0;
    }
    100% {
      top: 0;
    }
  }

  .ani-ellipsis-jump {
    &:before {
      position: relative;
      animation: jump-animation 1s infinite;
      animation-delay: 0s;
    }

    span {
      position: relative;
      animation: jump-animation 1s infinite;
      animation-delay: .25s;
    }

    &:after {
      position: relative;
      animation: jump-animation 1s infinite;
      animation-delay: .5s;
    }
  }
</style>