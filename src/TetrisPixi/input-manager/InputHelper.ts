import type {Preset} from "./presets/preset";
import type {ActionsEnum} from "@jmischler72/core-tetris";

export const isKeyInPreset = (key: string, preset: Preset): boolean => {
    return Object.values(preset.keys).filter((pKey) => pKey === key).length > 0;
}

export const setActionKey = (action: ActionsEnum, key: string, preset: Preset): Preset => {
    preset.keys[action] = key;
    return preset;
}