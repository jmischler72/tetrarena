<script lang="ts">
    import {Client} from "colyseus.js";
    import type {RoomAvailable} from "colyseus.js";
    import {onMount} from "svelte";
    import {clientStore} from "./multiplayerStore";
    import LobbiesList from "./LobbiesList.svelte";

    let rooms: RoomAvailable[] = [];
    let client: Client = new Client(import.meta.env.VITE_BACKEND_URL);
    clientStore.set(client);

    async function createLobby() {
        try {
            const room = await client.create("my_room", {/* options */});
            console.log("joined successfully", room);

        } catch (e) {
            console.error("join error", e);
        }
    }

    onMount(async () => {
        rooms = await client.getAvailableRooms("my_room");
    })
</script>

<!--<button on:click={() => createLobby()}>Create duo lobby</button>c-->
<LobbiesList></LobbiesList>
<!--<ul>-->

<!--    {#each rooms as room}-->
<!--        <li>-->
<!--            <p>{room.roomId}</p>-->
<!--            &lt;!&ndash;            <button on:click={() => onJoinLobby(lobby.lobbyId)}>&ndash;&gt;-->
<!--            &lt;!&ndash;                <LobbyCard {lobby}></LobbyCard>&ndash;&gt;-->
<!--            &lt;!&ndash;            </button>&ndash;&gt;-->
<!--        </li>-->
<!--    {/each}-->
<!--</ul>-->

