<script>
    import {onMount} from 'svelte';

    let colors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
        '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
        '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
        '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#212121',
    ];

    let squares = [];

    const squareSize = Math.floor(Math.min(window.innerWidth, window.innerHeight) / 10);
    const numSquares = window.innerWidth/squareSize * window.innerHeight/squareSize;

    function generateSquares() {
        for (let i = 0; i < numSquares; i++) {
            squares.push({
                color: colors[Math.floor(Math.random() * colors.length)],
                left: Math.floor(i / 10) * squareSize,
                top: (i % 10) * squareSize,
            });
        }
    }

    onMount(() => {
        generateSquares();
    });
</script>

<div>

    {#each squares as square}
        <div class="absolute opacity-40"
             style="
         width: {squareSize}px;
        height: {squareSize}px;
    background-color: {square.color};
    top: {square.top}px;
    left: {square.left}px;
  "
        />
    {/each}
</div>
