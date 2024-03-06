import {controls as controlsConfig} from './constants';
import {ActionsEnum} from '@jmischler72/core-tetris';
import {defaultPreset} from './presets/default';

/**
 * Represents key control and handle custom repeat delay
 */
// class Key {
//     code: string;
//     action: ActionsEnum;
//     pressed: boolean;
//
//     repeatsCount: number = 0;
//     repeatTimer: number = 0;
//
//     constructor(action: ActionsEnum, code: string) {
//         this.code = code;
//         this.action = action;
//         this.pressed = false;
//     }
//
//     /**
//      * Update repeat counters and check if action should be triggered
//      * @returns {boolean} true if action should be triggered
//      */
//     trigger() {
//         if (this.pressed) {
//             --this.repeatTimer;
//             if (this.repeatTimer <= 0) {
//                 this.repeatTimer =
//                     this.repeatsCount > 0
//                         ? controlsConfig.repeatDelay
//                         : controlsConfig.initialRepeatDelay;
//                 ++this.repeatsCount;
//                 return true;
//             }
//         }
//         return false;
//     }
//
//     onPress() {
//         this.pressed = true;
//     }
//
//     onRelease() {
//         this.pressed = false;
//         this.repeatTimer = 0;
//         this.repeatsCount = 0;
//     }
// }
//
//
// class Key {
//     _pressed: { [key in string]: boolean } = {};
//
//     isDown(keyCode: string) {
//         return this._pressed[keyCode];
//     }
//
//     onKeyDown(event: KeyboardEvent) {
//         this._pressed[event.key] = true;
//     }
//
//     onKeyUp(event: KeyboardEvent) {
//         delete this._pressed[event.key];
//     }
// }

/**
 * Handles keyboard controls for known keys
 *
 * This class could be more generic, but its not needed for this game.
 */
export default class Keyboard {
    private currentPreset: { [key in string]: ActionsEnum } = defaultPreset;

    // private keys: Map<string, Key> = new Map<string, Key>();

    constructor(private callback: (action: ActionsEnum) => void,) {
        // console.log(defaultPreset);
        // Object.keys(ActionsEnum).forEach(action => {
        //     let key = new Key(action as ActionsEnum, defaultPreset[action as ActionsEnum]);
        //     this.keys.set(defaultPreset[action as ActionsEnum], key);
        // });

        window.addEventListener('keydown', evt => {
            // console.log(evt.key as ActionsEnum);
            // console.log("test" + defaultPreset[evt.code]);
            this.callback(this.currentPreset[evt.code]);

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
