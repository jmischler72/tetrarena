<div class="flex flex-col card h-[90%] w-[80%] z-10 overflow-hidden">
    <slot name="header" class="w-full h-[10%] bg-gray-700/75 pl-10 items-center flex gap-6">
    </slot>
    <div class="h-full p-4">
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