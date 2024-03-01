import {ActionsEnum} from "@jmischler72/core-tetris";


export const defaultPreset: { [key in string]: ActionsEnum } = {
    'ArrowDown': ActionsEnum.GO_DOWN,
    // [ActionsEnum.GO_LEFT]: 'ArrowLeft',
    // [ActionsEnum.GO_RIGHT]: 'ArrowRight',
    // [ActionsEnum.ROTATE]: 'ArrowUp',
    // [ActionsEnum.INSTANT_PLACE]: 'LeftShift',
}

