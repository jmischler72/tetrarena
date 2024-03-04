import type {ActionsEnum} from '@jmischler72/core-tetris';
import {writable} from 'svelte/store'
import {defaultPreset} from "../ControlManager/presets/default";
import {browser} from "$app/environment"

export const keybindStore = writable<{ [key in ActionsEnum]: string }>(browser && JSON.parse(localStorage.getItem('keybind') || '""') || defaultPreset)

keybindStore.subscribe((value) => {
    if (!browser) return;
    localStorage.setItem('keybind', JSON.stringify(value));
    console.log('keybind updated', value);
})