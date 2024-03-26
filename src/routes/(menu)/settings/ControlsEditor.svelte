<script lang="ts">
    import {ActionsEnum} from "@jmischler72/core-tetris";
    import {keybindStore} from "$lib/stores/controlsStore";
    import {onMount} from "svelte";
    import type {Preset} from "$lib/data/presets/preset";
    import {isKeyInPreset, setActionKey} from "$lib/functions/helpers/InputHelper";

    let tempKeybind: Preset = structuredClone($keybindStore);

    let actionWaitingForKey: ActionsEnum | null = null;

    let controls: [string, ActionsEnum][] = [
        ["Move to the left", ActionsEnum.GO_LEFT],
        ["Move to the right", ActionsEnum.GO_RIGHT],
        ["Rotate", ActionsEnum.ROTATE],
        ["Soft Drop", ActionsEnum.GO_DOWN],
        ["Hard Drop", ActionsEnum.INSTANT_PLACE]
    ];

    function saveKeybinds() {
        $keybindStore = tempKeybind;
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (!actionWaitingForKey) return;
        if (!(isKeyInPreset(event.key, tempKeybind))) {
            tempKeybind = setActionKey(actionWaitingForKey, event.key, tempKeybind);
        }
        actionWaitingForKey = null;
        event.preventDefault();
    }

    $: console.log(tempKeybind, $keybindStore);

    onMount(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    });
</script>

<div class="rounded-lg border bg-card shadow-sm w-full h-full">
    <div class="p-6 flex flex-col space-y-4 h-[70%] overflow-y-scroll">
        {#each controls as control}
            <div class="grid grid-cols-2 mx-12 bg-gray-700 rounded  px-[10%] p-6">
                <h1
                        class="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center space-x-2"
                ><span>{control[0]}</span></h1>
                <button
                        class="flex bg-gray-200 h-10 w-[50%] rounded-md border-2 border-gray-800 px-8 py-2 text-sm text-gray-800 focus-visible:outline-gray-400 "
                        on:click={()=> actionWaitingForKey = control[1]}
                >
                    {#if (actionWaitingForKey === control[1])}
                        <span>Press a key...</span>
                    {:else}
                        {#if (tempKeybind.keys[control[1]] === " ")}
                            SPACE
                        {/if}
                        {(tempKeybind.keys[control[1]]).toUpperCase() || "Not set"}
                    {/if}
                </button>
            </div>
        {/each}
    </div>
    <div class="flex items-center justify-center p-6 mt-10">
        <div class="flex justify-end space-x-2">
            <button on:click={()=> saveKeybinds()}
                    disabled="{ JSON.stringify($keybindStore) === JSON.stringify(tempKeybind) }"
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Enregistrer
            </button>
        </div>
    </div>
</div>