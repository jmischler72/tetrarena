<script lang="ts">
    import {ActionsEnum} from "@jmischler72/core-tetris";
    import {keybindStore} from "../controlsStore";


    let controls = [
        ["Move to the left", ActionsEnum.GO_LEFT],
        ["Move to the right", ActionsEnum.GO_RIGHT],
        ["Rotate", ActionsEnum.ROTATE],
        ["Soft Drop", ActionsEnum.GO_DOWN],
        ["Hard Drop", ActionsEnum.INSTANT_PLACE]
    ];
    console.log($keybindStore[ActionsEnum.GO_DOWN]);
</script>


<!--
// v0 by Vercel.
// https://v0.dev/t/ITF4CuZybVv
-->
<div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">

    <div class="p-6 flex flex-col space-y-4 ">
        {#each controls as control}
            <div class="grid grid-cols-3 items-center space-x-4"><label
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center space-x-2"
                    for="move-up"><span>{control[0]}</span></label><input
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="move-up" placeholder="{$keybindStore[control[1]]}">
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                    Modifier
                </button>
            </div>
        {/each}
    </div>
    <div class="flex items-center p-6">
        <div class="flex justify-end space-x-2">
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Réinitialiser
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Enregistrer
            </button>
        </div>
    </div>
</div>