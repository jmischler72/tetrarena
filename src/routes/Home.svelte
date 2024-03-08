<script>
    import {goto} from "$app/navigation";
</script>

<div class="flex flex-col items-center text-gray-200 gap-4 text-6xl mb-16">
    <div class="flex flex-row gap-4">
        <button class="card h-[300px] w-[300px] flex justify-center items-center z-10" on:click={()=> goto('/game')}>
            <span class="material-symbols-outlined material-icons">person</span>
            <div class="shine"></div>
        </button>
        <button class="card h-[300px] w-[300px] flex justify-center items-center z-10"
                on:click={()=>goto('/multiplayer')}>
            <span class="material-symbols-outlined material-icons">group</span>

            <div class="shine"></div>
        </button>
    </div>
    <button class="card h-[200px] w-full flex justify-center items-center z-10" on:click={()=> goto('/settings')}>
        <span class="material-symbols-outlined material-icons">settings</span>

        <div class="shine"></div>
    </button>
</div>

<style lang="scss">
  .material-icons {
    font-size: 70px !important;
  }

  .card {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    cursor: pointer;
    position: relative;
    transition: box-shadow .25s;
    display: flex;
    justify-content: center;
    color: var(--card-icon-color);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 15px;
      background-color: var(--card-background-color);
    }

    .shine {
      border-radius: inherit;
      position: absolute;
      inset: 0;
      z-index: 1;
      overflow: hidden;
      opacity: 0;
      transition: opacity .5s;

      &:before {
        content: '';
        width: 150%;
        padding-bottom: 150%;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        bottom: 55%;
        filter: blur(35px);
        opacity: .1;
        transform: translateX(-50%);
        background-image: conic-gradient(from 205deg at 50% 50%, #3e2d8a 0deg, #332769 25deg, #302852 295deg, #272140 360deg);;
      }
    }

    &:hover {
      box-shadow: 0 3px 6px black;

      .material-icons {
        color: lightblue;
      }

      .shine {
        opacity: 1;
        transition-duration: .5s;
        transition-delay: 0s;
      }
    }
  }
</style>
