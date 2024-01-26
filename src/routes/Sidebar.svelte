<nav>
    <a href="/" class="play"><p>Play</p> <span class="material-symbols-outlined material-icons">play_arrow</span></a>
    <a href="/settings" class="settings"><p>Settings</p> <span
            class="material-symbols-outlined material-icons">settings</span></a>
</nav>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Roboto&family=Roboto+Condensed:ital,wght@1,800&display=swap');

    .material-icons {
        font-size: 60px;
    }

    nav {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-end;
        height: 100vh;
        color: lightgray;
        background: #232323;
        transform: translate(calc(-100% + 80px));

        & a {
            width: fit-content;
            display: flex;
            justify-content: flex-end;
            transition: 0.4s ease-in-out;
            align-items: center;
            gap: 30px;
            background-color: grey;
            border: 10px ridge darkgray;
            border-radius: 17px;
            padding-left: 40px;
            padding-right: 5px;
            text-decoration: none;


            & p {
                transition: 0.4s ease-in-out;
                color: var(--primary-color);
                font-size: 50px;
                font-family: 'Roboto Condensed', sans-serif;
                text-shadow: 1px 1px 2px black;
            }

            & img {
                height: 50px;
                filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(310deg) brightness(104%) contrast(101%);
            }
        }

        & a:hover {
            transform: translate(calc(100% - 90px));
            background-color: darkgray;

            & p {
                color: var(--secondary-color);
            }
        }
    }

    @media only screen and (max-width: 600px) {
        nav {
            visibility: hidden;
        }
    }


</style>