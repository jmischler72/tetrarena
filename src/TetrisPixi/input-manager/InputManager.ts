import {ActionsEnum} from "@jmischler72/core-tetris";
import {keybindStore} from "../../routes/controlsStore";
import type {Preset} from "./presets/preset";
import { get } from "svelte/store";

export default class InputManager {
    private currentPreset: Preset = get(keybindStore);

    // private keys: Map<string, Key> = new Map<string, Key>();

    constructor(private callback: (action: ActionsEnum) => void,) {
        // console.log(this.currentPreset);
        // Object.keys(ActionsEnum).forEach(action => {
        //     let key = new Key(action as ActionsEnum, defaultPreset[action as ActionsEnum]);
        //     this.keys.set(defaultPreset[action as ActionsEnum], key);
        // });

        window.addEventListener('keydown', evt => {
            // console.log(evt.key as ActionsEnum);
            // console.log(Object.keys(this.currentPreset.keys).find(key => this.currentPreset.keys[key as ActionsEnum] === evt.code));
            // console.log("test" + defaultPreset[evt.code]);
            this.callback(Object.keys(this.currentPreset.keys).find(key => this.currentPreset.keys[key as ActionsEnum] === evt.key) as ActionsEnum);

            // let key = this.keys.get(evt.key);
            // if (key) {
            //     key.onPress();
            // }
        });
        // window.addEventListener('keyup', evt => {
        //     let key = this.keys.get(evt.key);
        //     if (key) {
        //         key.onRelease();
        //     }
        // });
    }
}