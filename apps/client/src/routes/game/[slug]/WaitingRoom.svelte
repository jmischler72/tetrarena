<script lang="ts">
    import {roomStore} from "$lib/stores/multiplayerStore";
    import MenuContainer from "$lib/components/menu/MenuContainer.svelte";
    import MenuHeader from "$lib/components/menu/MenuHeader.svelte";
    import WaitingComponent from "./WaitingComponent.svelte";
    import GameEndComponent from "./GameEndComponent.svelte";
    import MenuFooter from "$lib/components/menu/MenuFooter.svelte";
    import Button from "$lib/components/Button.svelte";
    import {MessageTypeEnum} from "@jmischler72/types";

    let winner: string = "";

    function restartGame() {
        $roomStore?.send(MessageTypeEnum.GAME_RESTART);
    }

    $: $roomStore?.state.listen("winner", (currentValue) => {
        winner = currentValue;
    });
</script>

<MenuContainer>
    <MenuHeader slot="header">
        <div class="w-full text-2xl items-center justify-center flex">
            <h1>Room - {$roomStore?.roomId}</h1>
        </div>
    </MenuHeader>

    <div class="w-full h-full">
        {#if winner !== ""}
            <GameEndComponent winner={winner}/>
        {/if}
        <WaitingComponent></WaitingComponent>
    </div>

    <MenuFooter slot="footer">
        <div class="w-[70%]">
            <Button onClick={()=>restartGame()}
            >
                {#if winner}
                    Restart game
                {:else}
                    Start game
                {/if}
            </Button>
        </div>
    </MenuFooter>

</MenuContainer>
