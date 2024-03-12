<h1>Loading<span class="ani-ellipsis ani-ellipsis-jump"><span>.</span></h1>

<style lang="scss">
    .ani-ellipsis {
        &:before, &:after {
            content: '.';
        }
    }

    @keyframes jump-animation {
        0% {
            top: 0;
        }
        30% {
            top: -0.125em;
        }
        60% {
            top: 0;
        }
        100% {
            top: 0;
        }
    }

    .ani-ellipsis-jump {
        &:before {
            position: relative;
            animation: jump-animation 1s infinite;
            animation-delay: 0s;
        }
        span {
            position: relative;
            animation: jump-animation 1s infinite;
            animation-delay: .25s;
        }
        &:after {
            position: relative;
            animation: jump-animation 1s infinite;
            animation-delay: .5s;
        }
    }
</style>