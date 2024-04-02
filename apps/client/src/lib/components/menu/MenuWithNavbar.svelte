<script>
import Navbar from "../../../routes/(menu)/Navbar.svelte";
</script>

<div class="h-full w-full flex flex-col gap-6 p-8 ">
    <Navbar/>
    <div class="flex flex-col bg-black/[.6] text-white rounded h-[90%] w-full z-10 overflow-hidden justify-between">
        <slot/>
    </div>
</div>