<script>
</script>

<div class="card h-[90%] w-[90%]">
    <div class="flex justify-center items-center z-10">
        <slot></slot>
    </div>
</div>

<style lang="scss">
  .card {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
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
  }
</style>