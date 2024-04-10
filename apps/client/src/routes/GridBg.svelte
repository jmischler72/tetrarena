<script lang="ts">
	import {onMount} from 'svelte'

	const colors = [
		'#FFADAD',
		'#FFD6A5',
		'#FDFFB6',
		'#E4F1EE',
		'#D9EDF8',
		'#DEDAF4',
	]

	let squares: {color: string, top: number, left: number, classes: string}[] = [];
	let squareSize = 0;
	let numSquares = 0;

	function generateSquares() {
		squareSize = Math.ceil(
			Math.min(window.innerWidth, window.innerHeight) / 10
		)

		numSquares = ((window.innerWidth / squareSize) + 2)  * ((window.innerHeight / squareSize) + 2);
    squares = []

		for (let i = 0; i < numSquares; i++) {
			squares.push({
				color: colors[Math.floor(Math.random() * colors.length)],
				left: window.innerWidth >= window.innerHeight? Math.floor(i / 10) * squareSize : (i % 10) * squareSize,
				top: window.innerWidth >= window.innerHeight? (i % 10) * squareSize: Math.floor(i / 10) * squareSize,
				classes: 'opacity-25',
			})
		}
	}

	function triggerRipple() {
		const middleX = window.innerWidth / 2;
		const middleY = window.innerHeight / 2;

		squares.forEach((square) => {
			const distanceX = Math.abs(square.left + squareSize / 2 - middleX);
			const distanceY = Math.abs(square.top + squareSize / 2 - middleY);
			const distance = Math.max(distanceX, distanceY);

			setTimeout(() => {
				console.log("d");
				square.classes = 'opacity-100'; // Add the 'ripple' class to each square to start the animation
				squares = [...squares];

			}, distance); // Adjust the delay as per your preference
		});
	}
	onMount(() => {
		window.addEventListener('resize', generateSquares);
		generateSquares();
		triggerRipple();
	})
</script>

{#each squares as square}
	<div
		class="absolute {square.classes} transition-opacity duration-300 ease-in-out"
		style="
			width: {squareSize}px;
			height: {squareSize}px;
			background-color: {square.color};
			top: {square.top}px;
			left: {square.left}px;
" />
{/each}