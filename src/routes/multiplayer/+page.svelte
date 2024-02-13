<script lang="ts">
    import {Client} from "colyseus.js";
    import type {RoomAvailable} from "colyseus.js";
    import {onMount} from "svelte";
    import {clientStore} from "./multiplayerStore";
    import LobbiesList from "./LobbiesList.svelte";
    import MenuContainer from "../MenuContainer.svelte";
    import LobbyForm from "./LobbyForm.svelte";

    let client: Client = new Client(import.meta.env.VITE_BACKEND_URL);
    clientStore.set(client);

    // async function createLobby() {
    //     try {
    //         const room = await client.create("my_room", {/* options */});
    //         console.log("joined successfully", room);
    //
    //     } catch (e) {
    //         console.error("join error", e);
    //     }
    // }


</script>

<!--<button on:click={() => createLobby()}>Create duo lobby</button>c-->
<MenuContainer menus="{[
    {text: 'Rooms List', icon: 'list', selected: true},
    {text: 'Create Room', icon: 'add_circle', selected: false},
    ]}">
    <LobbyForm></LobbyForm>
</MenuContainer>
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

