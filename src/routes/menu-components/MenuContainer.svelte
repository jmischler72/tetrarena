<div class="flex flex-col card h-[80%] w-[80%] z-10 overflow-hidden">
    <slot name="header" >
    </slot>
    <div class="h-[90%] p-4">
        <slot></slot>
    </div>
</div>

<style lang="scss">
  .card {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    color: white;
  }
</style>