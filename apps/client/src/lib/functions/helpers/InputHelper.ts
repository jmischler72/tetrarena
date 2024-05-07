import type { Preset } from '$lib/data/presets/preset';
import type { ActionsEnum } from '@jmischler72/core';
import { get } from 'svelte/store';
import { keybindStore } from '$lib/stores/ControlsStore';

export const isKeyInPreset = (key: string, preset: Preset): boolean => {
	return Object.values(preset.keys).filter((pKey) => pKey === key).length > 0;
};

export const setActionKey = (action: ActionsEnum, key: string, preset: Preset): Preset => {
	preset.keys[action] = key;
	return preset;
};

export const onKeyDown = (evt: KeyboardEvent) => {
	const action = Object.keys(get(keybindStore).keys).find(
		(key) => get(keybindStore).keys[key as ActionsEnum] === evt.key,
	);
	return action as ActionsEnum;
};
