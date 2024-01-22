<script lang="ts">
    import {Room} from "colyseus.js";
    import {onMount} from "svelte";
    import {Client} from 'colyseus.js'

    let room: Room | null = null;

    async function connect() {
        let client = new Client('ws://localhost:2567');
        room = await client.joinOrCreate("my_room", { /* options */});
    }

    onMount(() => {
        connect();
    })


    function sendX() {
        if (room) {
            room.send("move", {x: 1});
        }
    }
</script>

<button on:click={() => sendX()}></button>
