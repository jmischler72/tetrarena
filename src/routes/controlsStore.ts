import {writable} from 'svelte/store'
import {browser} from "$app/environment"
import type {Preset} from "../ControlManager/presets/preset";
import {defaultPreset} from "../ControlManager/presets/default";

export const keybindStore = writable<Preset>((browser && JSON.parse(localStorage.getItem('keybind') || '""')) || defaultPreset)

keybindStore.subscribe((value) => {
    if (!browser) return;
    localStorage.setItem('keybind', JSON.stringify(value));
    console.log('keybind updated', value);
})