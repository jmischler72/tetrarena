<script>
    import Home from "./Home.svelte";
    import GridBackground from "./GridBackground.svelte";


</script>


<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
<div class="flex flex-col bg-gray-700 h-[100vh] overflow-hidden items-center">
    <nav class="w-[80%] h-[100px] flex text-gray-200 text-5xl justify-center items-end mt-5 pb-4 pt-10 bg-[rgba(100,100,100,0.5)] overflow-hidden relative z-10">
        <h1 class="title">tetrarena</h1>
        <div class="absolute left-3 bottom-0 text-3xl mb-4 cursor-pointer">
            <h1><span class="material-symbols-outlined !text-[60px] arrow">chevron_left</span>back</h1>

        </div>
        <h1 class="absolute right-3 bottom-0 text-3xl mb-4">multiplayer</h1>
    </nav>
    <div class="main relative ">
        <div class="absolute w-full">
            <GridBackground></GridBackground>
        </div>

        <Home></Home>
        <!--        <LobbiesList></LobbiesList>-->
    </div>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    nav {
        /*background: #1a1a1a;*/

        font-family: 'Press Start 2P', system-ui;
    }

    .title {
        border: 2px solid white;
        padding: 2px;
        /*background-image: url($lib/spritesheet/spritesheet.png);*/
        /*background-size: 150px;*/
        /*-webkit-background-clip: text;*/
        /*-webkit-text-fill-color:  rgba(255,255,255,0.2);*/
    }

    .arrow {
        transform: translate(0, 10px);
    }

    .main {
        display: flex;
        height: 100%;
        width: 100%;
        padding-top: -50px;
        justify-content: center;
        align-items: center;
    }


    /*.background {*/
    /*    background-color: #2e2e2e;*/
    /*    background-size: 40px 40px;*/
    /*    background-image: linear-gradient(to right, #3d3d3d 1px, transparent 1px),*/
    /*    linear-gradient(to bottom, #3d3d3d 1px, transparent 1px);*/
    /*}*/
</style>
