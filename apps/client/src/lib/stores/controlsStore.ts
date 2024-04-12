import { type Writable, writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Preset } from '$lib/data/presets/preset';
import { defaultPreset } from '$lib/data/presets/default';

export const keybindStore: Writable<Preset> = writable<Preset>(
  (browser && JSON.parse(localStorage.getItem('keybind') || '""')) || defaultPreset,
);
keybindStore.subscribe((value) => {
  if (!browser) return;
  localStorage.setItem('keybind', JSON.stringify(value));
});
