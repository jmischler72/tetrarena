<script lang="ts">
	import { onMount } from 'svelte';

	export let sec: number;

	function applyMask() {
		let pct = 100 - (sec / 50) * 100;
		const customBorder = document.querySelector('.custom-border') as HTMLElement;
		if (customBorder) {
			customBorder.style.mask = `conic-gradient(transparent ${pct}%, #000 ${pct}%)`;
		}
	}

	onMount(() => {
		applyMask();

		const timer = setInterval(() => {
			sec--;
			applyMask();
			if (sec === 0) {
				clearInterval(timer);
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	});
</script>

<div class="wrapper">
	<div class="timer">{sec}</div>
	<div class="custom-border border-4 border-solid border-gray-400"></div>
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.timer {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: medium;
	}

	.custom-border {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}
</style>
