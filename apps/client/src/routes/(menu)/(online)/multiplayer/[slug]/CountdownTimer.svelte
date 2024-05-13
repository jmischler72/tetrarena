<div class="wrapper">
	<div class="timer"></div>
	<div class="custom-border border-4 border-solid border-gray-400"></div>
</div>

<style lang="scss">
	$sec: 50;

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
		&::before {
			content: '';
			animation: countdown steps($sec + 1) both #{$sec + 1}s infinite;
		}
	}
	.custom-border {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		animation: round steps($sec + 1) both #{$sec + 1}s infinite;
	}

	@keyframes countdown {
		@for $i from 0 through $sec {
			$count: $sec - $i;
			#{$i / $sec * 100%} {
				content: '#{$count}';
			}
		}
	}

	@keyframes round {
		@for $i from 0 through $sec {
			$pct: $i / $sec * 100%;
			#{$pct} {
				mask: conic-gradient(transparent $pct, #000 $pct);
			}
		}
	}
</style>
