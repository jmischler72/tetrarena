<script>

    import {onMount} from "svelte";

    onMount(() => {

        let columns = 10; //gets from css custom property
        const rows = 20;

        const shapes = ["square"];
        const colors = ["red", "yellow", "green", "blue"];

        function drawBg() {
            let bg_container = document.querySelector("#bg-container");

            while (bg_container.firstChild) {
                bg_container.removeChild(bg_container.lastChild);
            }

            for (let i = 0; i < (columns * rows); i++) {
                let new_shape = document.createElement("div");

                new_shape.classList.add(
                    "shape",
                    shapes[Math.floor(Math.random() * shapes.length)],
                    colors[Math.floor(Math.random() * colors.length)]
                )

                new_shape.id = i.toString();

                document.querySelector("#bg-container")?.appendChild(new_shape);
            }

            attachAnimations();
        }

        const getX = (id, cols = columns) => {//default to global columns
            return id % cols;
        }
        const getY = (id, cols = columns) => {//default to global columns
            return Math.floor(id / cols);
        }
        const getDistance = (a, b) => {
            return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
        }

        const cancelAnims = (element) => {
            const animations = element.getAnimations();

            for (const animation of animations) {
                if (animation.playState === "running") {

                    animation.cancel();

                }
            }
        }

        function ripple(e) {
            const this_shape = e.target;

            let target_pos = [getX(this_shape.id), getY(this_shape.id)]

            const bg_container = document.querySelector("#bg-container");
            const bg_children = bg_container.children;

            for (let i = 0; i < bg_children.length; i++) {
                let curr_shape = bg_children.item(i);
                const curr_pos = [getX(curr_shape.id), getY(curr_shape.id)]

                const dist = getDistance(target_pos, curr_pos);

                const offset = 0.2;

                const anim_offset = 0.2 * dist;

                cancelAnims(curr_shape);

                const opacity = window.getComputedStyle(curr_shape).getPropertyValue('opacity');

                const anim = curr_shape.animate([
                    {
                        opacity: opacity,
                        easing: 'ease-out'
                    },
                    {
                        opacity: 0.9,
                        offset: 0.6,
                        easing: 'ease-in'
                    },
                    {opacity: 0.1}
                ], {
                    // timing options
                    duration: 400,
                    delay: anim_offset * 200,
                    fill: 'forwards'
                });

                // Detect when the animation has finished
                anim.onfinish = function () {
                    // Set the final styles of the element
                    curr_shape.style.opacity = 0.1;
                };


            }
        }

        function attachAnimations() {
            const shapes = document.querySelectorAll(".shape");
            for (let i = 0; i < shapes.length; i++) {
                let shape = shapes[i]

                shape.addEventListener('mousedown', (e) => {
                    ripple(e)
                });
                shape.addEventListener('touchend', (e) => {
                    ripple(e)
                });

                shape.addEventListener('mouseenter', (e) => {
                    const index = parseInt(e.target.id);

                    const col_length = 0;
                    const row_length = 0;

                    const col = getX(index);
                    const row = getY(index);

                    //clamp between 0 and columns
                    const min_col = Math.max(0, (col - col_length))
                    const max_col = Math.min(columns - 1, (col + col_length))

                    //clamp between 0 and max rows
                    const min_row = Math.max(0, (row - row_length))
                    const max_row = Math.min(rows - 1, (row + row_length))


                    let id_list = [index];

                    for (let i = min_col; i <= max_col; i++) {
                        if (i !== col) {
                            id_list.push(i + row * columns);
                        }
                    }

                    for (let i = min_row; i <= max_row; i++) {
                        if (i !== row) {
                            id_list.push(i * columns + col);
                        }
                    }

                    for (let j = 0; j < id_list.length; j++) {
                        let adj = document.getElementById(id_list[j]);

                        // Get the current opacity value of the element
                        const opacity = window.getComputedStyle(adj).getPropertyValue('opacity');

                        adj.animate([
                            // keyframes
                            {
                                opacity: opacity,
                                easing: 'ease-out'
                            },
                            {
                                opacity: 0.9,
                                offset: 0.6,
                                easing: 'ease-in'
                            },
                            {opacity: 0.1}
                        ], {
                            // timing options
                            duration: 1000,
                        })

                    }
                })
            }
        }

        document.addEventListener("DOMContentLoaded", function () {

            let root = document.documentElement;
            columns = getComputedStyle(root).getPropertyValue('--col-count');
            drawBg()

        });

    })

</script>
<main id="bg-container">
</main>

<style lang="scss">
  //colors
  $red: #E14860;
  $yellow: #FBC020;
  $green: #2FC566;
  $blue: #56AFEA;

  :global(body) {
    --col-count: 15;
  }
  main {
    background-color: red;
    padding: 0;
    margin: 0;
    color: #121212;
    font-family: sans-serif;
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--col-count), 1fr);
    row-gap: 10px;
    column-gap: 10px;
    place-items: center;
    width: 100%;
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Catamaran', sans-serif;
  }

  .shape {
    aspect-ratio: 1 / 1;
    background: red;
    border: 1px solid white;
    cursor: pointer;
    opacity: 0.1;
    transition: .2s;
    width: 100%;
  }

  .square {
    border-radius: 8%;
  }

  .circle {
    border-radius: 100%;
  }

  .diamond {
    // true scale is (0.7071067812);
    transform: rotate(45deg) scale(0.8);
    border-radius: 20%;
  }

  .red {
    background-color: $red;
  }

  .blue {
    background-color: $blue;
  }

  .green {
    background-color: $green;
  }

  .yellow {
    background-color: $yellow;
  }

  .randomise {
    background-color: #414141;
    border: 1px solid white;
    border-radius: 8px;
    bottom: 1rem;
    color: white;
    cursor: pointer;
    left: 50%;
    padding: .5rem 2rem;
    position: fixed;
    transform: translateX(-50%);
    z-index: 2;
    transition: .2s;

    &:hover {
      background-color: #595959;
    }
  }

</style>