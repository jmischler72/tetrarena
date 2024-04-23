<script lang="ts">
  import { roomStore } from "$lib/stores/multiplayerStore";
  import MenuContainer from "$lib/components/menu/subcomponents/MenuContainer.svelte";
  import MenuHeader from "$lib/components/menu/subcomponents/MenuHeader.svelte";
  import WaitingComponent from "./WaitingComponent.svelte";
  import GameEndComponent from "./GameEndComponent.svelte";
  import MenuFooter from "$lib/components/menu/subcomponents/MenuFooter.svelte";
  import Button from "$lib/components/Button.svelte";
  import { getGameModeFromEnum, MessageTypeEnum } from "@jmischler72/shared";
  import { snackbarStore } from "$lib/stores/snackbarStore";
  import MenuButtonHeader from "$lib/components/menu/subcomponents/MenuButtonHeader.svelte";
  import RoomForm from "../(room-create)/RoomForm.svelte";
  import { GameModeEnum } from "@jmischler72/shared";

  let winner: string = "";
  let players: Map<string, boolean> = new Map<string, boolean>();

  let optionsMenu: boolean = false;
  let roomOptions = {
    name: $roomStore?.state.name || "",
    icon: $roomStore?.state.icon || "",
    gameMode: getGameModeFromEnum($roomStore?.state.gameMode as GameModeEnum)
  };


  function playerReady() {
    $roomStore?.send(MessageTypeEnum.READY);
  }

  $roomStore?.state.listen("winner", (currentValue) => {
    winner = currentValue;
  });

  $: $roomStore?.state.players.onAdd((player, key) => {
    player.listen("ready", (value) => {
      players.set(key, value);
      players = players;
    });
  });

  $: $roomStore?.state.players.onRemove((player, key) => {
    snackbarStore.set(key + " left the room!");

    players.delete(key);
    players = players;
  });
</script>


<MenuHeader>
  <div class="absolute w-full text-2xl ml-auto mr-auto left-0 right-0 flex justify-center z-0">
    <h1>Room - {$roomStore?.roomId}</h1>
  </div>
  {#if $roomStore?.sessionId === $roomStore?.state.admin}
    <MenuButtonHeader on:click={()=> optionsMenu = !optionsMenu}
                      text="Options"
                      icon="settings"
                      selected="{optionsMenu}" />
  {/if}

</MenuHeader>
<MenuContainer>
  <div class="w-full h-full">
    {#if optionsMenu}
      <RoomForm bind:roomOptions></RoomForm>
    {:else }

      {#if winner !== ""}
        <GameEndComponent winner={winner} />
      {/if}
      <WaitingComponent bind:players="{players}"></WaitingComponent>

    {/if}
  </div>


</MenuContainer>
<MenuFooter>
  <div class="w-[70%]">
    <Button onClick={()=>playerReady()}
            disabled="{  players.get($roomStore?.sessionId || '') }"
    >
      {#if players.get($roomStore?.sessionId || '')}
        <span class="translate-y-[-4px] translate-x-[-5px] text-green-100">&#10004;</span> Ready
      {:else}
        Ready
      {/if}
    </Button>
  </div>
</MenuFooter>
