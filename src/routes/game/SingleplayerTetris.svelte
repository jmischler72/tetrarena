<script lang="ts">
    import {onMount} from "svelte";
    import {Manager} from "../../TetrisPixi/Manager";
    import SinglePlayerGameScene from "../../TetrisPixi/scenes/SinglePlayerGameScene";
    import {SinglePlayerInstance} from "@jmischler72/core-tetris";
    import InputManager from "../../TetrisPixi/input-manager/InputManager";
    import {goto} from "$app/navigation";

    const instance: SinglePlayerInstance = new SinglePlayerInstance();

    let escPressed = false;

    function keyDown(event: KeyboardEvent) {
        if (event.key === 'Escape' && !escPressed) {
            escPressed = true;
            const timeout = setTimeout(() => {
                console.log('timeout');
                goto('/');
            }, 800);

            const removeKeyUpListener = () => {
                event.target?.removeEventListener('keyup', removeKeyUpListener);
                escPressed = false;
                clearTimeout(timeout);
            };

            event.target?.addEventListener('keyup', removeKeyUpListener);
        }
    }

    onMount(() => {
        new InputManager((action) => instance.handleAction(action));

        console.log('mounting')

        Manager.initialize();
        Manager.changeScene(new SinglePlayerGameScene(instance));
        window.addEventListener('keydown', keyDown);

        return () => {
            console.log('unmounting')
            Manager.destroy();
            instance.stopGame();
            window.removeEventListener("keydown", keyDown);
        };
    });

</script>

<canvas id="pixi-canvas"></canvas>

<footer class="w-[98%] absolute bottom-5 text-gray-500 flex flex-row gap-2 justify-end items-end">
    <h1 class="text-3xl"
        class:fill-animation={escPressed}
    ><span class="opacity-animation">to quit press </span>ESC
    </h1>
</footer>

<style lang="scss">
  :root {
    overflow: hidden;
  }

  $main-color: theme('colors.gray.700');
  $secondary-color: theme('colors.gray.400');

  h1 {
    margin-left: 80px;
    color: $main-color;
    text-decoration: none;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(
                    0deg,
                    $secondary-color,
                    $secondary-color 50%,
                    $main-color 50%);
    background-size: 100% 200%;
    background-position: 0 0;
    transition: all 1.5s cubic-bezier(0.19, 1, 0.22, 1)
  }

  .fill-animation {
    background-position: 100% 100%;
  }

  .opacity-animation{
    opacity: 1;
    animation: opacity-out 3s cubic-bezier(0.19, 1, 0.22, 1) 5s forwards;
  }

  @keyframes opacity-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>

