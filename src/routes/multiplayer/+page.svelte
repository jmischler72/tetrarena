<script lang="ts">
    import {Client} from "colyseus.js";
    import {clientStore} from "./multiplayerStore";
    import MenuContainer from "../MenuComponents/MenuContainer.svelte";
    import LobbyForm from "./LobbyForm.svelte";
    import {roomStore} from "./multiplayerStore";
    import {goto} from "$app/navigation";

    let client: Client = new Client(import.meta.env.VITE_BACKEND_URL);
    clientStore.set(client);

    $: if ($roomStore) goto('/multiplayer/' + $roomStore?.roomId);
</script>


<MenuContainer menus="{[
    {text: 'Rooms List', icon: 'list', selected: true},
    {text: 'Create Room', icon: 'add_circle', selected: false},
    ]}">
    <LobbyForm></LobbyForm>
</MenuContainer>

