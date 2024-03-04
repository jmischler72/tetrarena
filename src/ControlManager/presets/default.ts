import {ActionsEnum} from "@jmischler72/core-tetris";


export const defaultPreset: { [key in ActionsEnum]: string } = {
    GoLeft: "", GoRight: "", InstantPlace: "", Rotate: "",
    [ActionsEnum.GO_DOWN]: 'ArrowDown'
}

