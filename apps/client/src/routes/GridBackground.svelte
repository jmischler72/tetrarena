<script>

    import {onMount} from "svelte";

    const shapes = ["square"];
    const colors = ["red", "yellow", "green", "blue"];
    let columns = 30; //gets from css custom property
    const rows = 25;

    const getX = (id, cols = columns) => {//default to global columns
        return id % cols;
    }
    
    const getY = (id, cols = columns) => {//default to global columns
        return Math.floor(id / cols);
    }
    const getDistance = (a, b) => {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
    }

    onMount(() => {
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
                    {opacity: 0}
                ], {
                    // timing options
                    duration: 400,
                    delay: anim_offset * 200,
                    fill: 'forwards'
                });

                // Detect when the animation has finished
                anim.onfinish = function () {
                    // Set the final styles of the element
                    curr_shape.style.opacity = 0;
                };


            }
        }

        function attachAnimations() {
            const shapes = document.querySelectorAll(".shape");
            for (let i = 0; i < shapes.length; i++) {
                let shape = shapes[i]

                // shape.addEventListener('mousedown', (e) => {
                //     ripple(e)
                // });
                // shape.addEventListener('touchend', (e) => {
                //     ripple(e)
                // });

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
                            {opacity: 0}
                        ], {
                            // timing options
                            duration: 300,
                        })

                    }
                })
            }
        }

        attachAnimations();
    })

</script>

<main id="bg-container">
    {#each {length: columns * rows} as _, i}
        <div id="{i}" class={"shape square " +
        colors[Math.floor(Math.random() * colors.length)]}>
        </div>
    {/each}
</main>

<style lang="scss" global>
  //colors
  $red: #E14860;
  $yellow: #FBC020;
  $green: #2FC566;
  $blue: #56AFEA;

  main {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    position: relative;
    display: grid;
    grid-template-columns: repeat(30, 80px);
    //row-gap: 10px;
    //column-gap: 10px;
    place-items: center;
    width: 100%;
    height: 100%;
  }

  .shape {
    aspect-ratio: 1 / 1;
    background: red;
    opacity: 0;
    transition: .2s;
    width: 100%;
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


</style>