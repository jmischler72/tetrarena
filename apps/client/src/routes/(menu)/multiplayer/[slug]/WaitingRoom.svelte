<script lang="ts">
    import {roomStore} from "$lib/stores/multiplayerStore";
    import MenuContainer from "$lib/components/menu/subcomponents/MenuContainer.svelte";
    import MenuHeader from "$lib/components/menu/subcomponents/MenuHeader.svelte";
    import WaitingComponent from "./WaitingComponent.svelte";
    import GameEndComponent from "./GameEndComponent.svelte";
    import MenuFooter from "$lib/components/menu/subcomponents/MenuFooter.svelte";
    import Button from "$lib/components/Button.svelte";
    import {MessageTypeEnum} from '@jmischler72/types';

    let winner: string = "";
    let players: Map<string, boolean> = new Map<string, boolean>();

    function playerReady() {
        $roomStore?.send(MessageTypeEnum.READY);
    }

    $roomStore?.state.listen("winner", (currentValue) => {
        winner = currentValue;
    });

    $roomStore?.state.players.onAdd((player, key) => {
        player.listen("ready", (value) => {
            players.set(key, value);
            players = players;
        });
    });
</script>

<MenuHeader>
    <div class="w-full text-2xl items-center justify-center flex">
        <h1>Room - {$roomStore?.roomId}</h1>
    </div>
</MenuHeader>
<MenuContainer>
    <div class="w-full h-full">
        {#if winner !== ""}
            <GameEndComponent winner={winner}/>
        {/if}
        <WaitingComponent bind:players='{players}'></WaitingComponent>
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
