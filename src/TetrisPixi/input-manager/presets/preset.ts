import {ActionsEnum} from "@jmischler72/core-tetris";

export type Preset = {
    name: string
    keys: { [key in ActionsEnum]: string };
}