import {writable} from 'svelte/store'
import {browser} from "$app/environment"
import type {Preset} from "../TetrisPixi/input-manager/presets/preset";
import {defaultPreset} from "../TetrisPixi/input-manager/presets/default";

export const keybindStore = writable<Preset>((browser && JSON.parse(localStorage.getItem('keybind') || '""')) || defaultPreset)

keybindStore.subscribe((value) => {
    if (!browser) return;
    localStorage.setItem('keybind', JSON.stringify(value));
    console.log('keybind updated', value);
})