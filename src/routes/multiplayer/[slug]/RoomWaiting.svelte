<script>

    import {roomStore} from "../multiplayerStore";
    import MenuContainer from "../../menu-components/MenuContainer.svelte";

    $: console.log($roomStore.state.players.keys());
</script>

<MenuContainer>
    <div slot="header" class="w-full h-[14%] bg-gray-700/75 text-2xl items-center justify-center flex ">
        <h1>Room - {$roomStore.roomId}</h1>

    </div>
    <h1>Waiting for players<span class="ani-ellipsis ani-ellipsis-jump"><span>.</span></span></h1>

    <li>
        {#each $roomStore.state.players.keys() as player}
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