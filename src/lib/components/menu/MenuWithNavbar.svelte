<script>
import Navbar from "../../../routes/(menu)/Navbar.svelte";
</script>

<div class="h-full w-full flex flex-col gap-6 p-8 ">
    <Navbar/>
    <div class="h-[90%] w-full flex justify-center items-center">
        <slot/>
    </div>
</div>