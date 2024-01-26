<script>
    import Home from "./Home.svelte";
    import LobbiesList from "./multiplayer/LobbiesList.svelte";
    import {spritesheet} from '$lib';
    import {onMount} from "svelte";

    let currentPage = "";

    let canvas;


    onMount(()=>{
        const ctx = canvas.getContext("2d");

        let w, h, particles;
        let particleDistance = 40;
        let mouse = {
            x: undefined,
            y: undefined,
            radius: 100
        }

        function init() {
            resizeReset();
            animationLoop();
        }

        function resizeReset() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;

            particles = [];
            for (let y = (((h - particleDistance) % particleDistance) + particleDistance) / 2; y < h; y += particleDistance) {
                for (let x = (((w - particleDistance) % particleDistance) + particleDistance) / 2; x < w; x += particleDistance) {
                    particles.push(new Particle(x, y));
                }
            }
        }

        function animationLoop() {
            ctx.clearRect(0, 0, w, h);
            drawScene();
            requestAnimationFrame(animationLoop);
        }

        function drawScene() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            drawLine();
        }

        function drawLine() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < particleDistance * 1.5) {
                        let opacity = 1 - (distance / (particleDistance * 1.5));
                        ctx.strokeStyle = "rgba(255,255,255," + opacity + ")";
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function mousemove(e) {
            mouse.x = e.x;
            mouse.y = e.y;
        }

        function mouseout() {
            mouse.x = undefined;
            mouse.y = undefined;
        }

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 4;
                this.baseX = this.x;
                this.baseY = this.y;
                this.speed = (Math.random() * 25) + 5;
            }
            draw() {
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let directionX = forceDirectionX * force * this.speed;
                let directionY = forceDirectionY * force * this.speed;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        init();
        window.addEventListener("resize", resizeReset);
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseout", mouseout);

    })
</script>


<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
<canvas bind:this={canvas} id="canvas"></canvas>

<div class="flex flex-col background h-[100vh]">
    <nav class="w-full h-[100px] flex text-gray-200 text-5xl justify-center items-end pt-8 pb-3 overflow-hidden relative">
        <h1 class="title">tetrarena</h1>
        <div class="absolute left-3 bottom-0 text-3xl mb-4 cursor-pointer">
            <h1><span class="material-symbols-outlined !text-[60px] arrow">chevron_left</span>back</h1>

        </div>
        <h1 class="absolute right-3 bottom-0 text-3xl mb-4">multiplayer</h1>
    </nav>
    <div class="main">


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

    #canvas {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
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
