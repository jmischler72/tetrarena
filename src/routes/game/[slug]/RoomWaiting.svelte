<script lang="ts">

    import {roomStore} from "$lib/stores/multiplayerStore";
    import MenuContainer from "$lib/components/menu-components/MenuContainer.svelte";

    let players: string[] = [];

    $: $roomStore?.state.listen("players", (currentValue) => {
        players = Array.from(currentValue.keys());
    });
</script>

<MenuContainer>
    <div slot="header" class="w-full h-[14%] bg-gray-700/75 text-2xl items-center justify-center flex relative ">
        <h1>Room - {$roomStore?.roomId}</h1>
        <h2 class="absolute right-4 text-sm text-gray-300">Room - {$roomStore?.roomId}</h2>
    </div>
    <h1>Waiting for players<span class="ani-ellipsis ani-ellipsis-jump"><span>.</span></span></h1>

    <li>
        {#each players as player}
            <ul>{player}</ul>
        {/each}
    </li>
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