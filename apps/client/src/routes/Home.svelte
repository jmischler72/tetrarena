<script>
    import {goto} from "$app/navigation";
</script>

<div class="flex flex-col items-center justify-center text-gray-200 gap-y-4 text-6xl">
    <div class="flex flex-row gap-x-4">
        <button class="card h-[300px] w-[300px] flex justify-center items-center" on:click={()=> goto('/game')}>
            <span class="material-symbols-outlined material-icons">person</span>
        </button>
        <button class="card h-[300px] w-[300px] flex justify-center items-center"
                on:click={()=>goto('/multiplayer')}>
            <span class="material-symbols-outlined material-icons">group</span>

        </button>
    </div>
    <button class="card h-[200px] w-full flex justify-center items-center" on:click={()=> goto('/settings')}>
        <span class="material-symbols-outlined material-icons">settings</span>
    </button>
</div>

<style lang="scss">
  .material-icons {
    font-size: 70px !important;
  }

  .card {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 15px;
    cursor: pointer;
    position: relative;
    transition: box-shadow .25s;
    display: flex;
    justify-content: center;

    &:hover {
      @apply shadow-lg shadow-gray-900;

      .material-icons {
        @apply text-gray-400;
      }
    }
  }
</style>
