<script>
    import Home from "./Home.svelte";
    import LobbiesList from "./multiplayer/LobbiesList.svelte";
    import {spritesheet} from '$lib';
    import {onMount} from "svelte";
    import GridBackground from "./GridBackground.svelte";

    let currentPage = "";



</script>


<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
<div class="flex flex-col background h-[100vh]">
    <nav class="w-full h-[100px] flex text-gray-200 text-5xl justify-center items-end pt-8 pb-3 overflow-hidden relative">
        <h1 class="title">tetrarena</h1>
        <div class="absolute left-3 bottom-0 text-3xl mb-4 cursor-pointer">
            <h1><span class="material-symbols-outlined !text-[60px] arrow">chevron_left</span>back</h1>

        </div>
        <h1 class="absolute right-3 bottom-0 text-3xl mb-4">multiplayer</h1>
    </nav>
    <div class="main">
        <GridBackground></GridBackground>

        <Home></Home>
        <!--        <LobbiesList></LobbiesList>-->
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    nav {
        background: #1a1a1a;

        font-family: 'Press Start 2P', system-ui;
    }

    .title {
        background-image: url($lib/spritesheet/spritesheet.png);
        background-size: 150px;
        -webkit-background-clip: text;
        -webkit-text-fill-color:  rgba(255,255,255,0.2);
    }

    .arrow {
        transform: translate(0, 10px);
    }

    .main {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;

    }

    .background {
        background-color: #2e2e2e;
        background-size: 40px 40px;
        background-image: linear-gradient(to right, #3d3d3d 1px, transparent 1px),
        linear-gradient(to bottom, #3d3d3d 1px, transparent 1px);
    }
</style>
