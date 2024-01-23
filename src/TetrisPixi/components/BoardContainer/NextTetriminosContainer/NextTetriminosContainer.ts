import * as PIXI from 'pixi.js';
import TetriminoContainer from './TetriminoContainer';
import type {ColorEnum} from "@jmischler72/core-tetris";
import {SMALL_BLOCK_SIZE} from "./constants";
import {newTetriminoTween} from "./NextTetriminosContainerAnimation";

const PADDING = 5;
const CONTAINER_SIZE = SMALL_BLOCK_SIZE * 3 + PADDING;

export default class NextTetriminosContainer extends PIXI.Container {
    private tetriminosContainers: TetriminoContainer[] = [];
    private currentTetriminos: ColorEnum[] = [];

    constructor() {
        super();
    }

    private renderSingleTetriminoContainer(
        itemPosition: number,
        color: ColorEnum
    ) {
        let tetriminoContainer = new TetriminoContainer(color);
        tetriminoContainer.position.set(0, itemPosition * CONTAINER_SIZE);

        this.tetriminosContainers.push(tetriminoContainer);
        this.addChild(tetriminoContainer);

        newTetriminoTween(tetriminoContainer).start();

    }

    private compareArrays(liste1: ColorEnum[], liste2: ColorEnum[]) {
        if (liste1.length !== liste2.length) {
            return false;
        }
        // Comparer chaque élément des listes
        for (let i = 0; i < liste1.length; i++) {
            if (liste1[i] !== liste2[i]) {
                return false;
            }
        }

        // Si toutes les conditions sont remplies, les listes sont égales
        return true;
    }

    public renderTetriminoContainers(nextTetriminos: ColorEnum[]) {
        // console.log(nextTetriminos);
        // First Check : If next Tetriminos are the same as the current ones or no new Tetriminos to render, we can early return
        if (
            this.compareArrays(this.currentTetriminos, nextTetriminos)
        ) {
            return;
        }

        // console.log(this.currentTetriminos.toString() + ":" + nextTetriminos.toString());

        //Second Check : If there are no current Tetriminos and there are new ones we render all of them
        if (!this.currentTetriminos.length && nextTetriminos.length) {
            for (let i = 0; i < nextTetriminos.length; i++) {
                this.renderSingleTetriminoContainer(i, nextTetriminos[i]);
            }
            // Else we update with an animation
        } else {
            this.updateTetriminoContainers(nextTetriminos[nextTetriminos.length - 1]);
        }

        this.currentTetriminos = [...nextTetriminos];
    }

    private updateTetriminoContainers(color: ColorEnum) {
        //Remove First Container From Container Queues
        let firstContainer: TetriminoContainer | undefined =
            this.tetriminosContainers.shift();

        if (firstContainer) {
            this.removeChild(firstContainer);
        }

        //Change positions of tetriminos
        this.tetriminosContainers.forEach(tetriminoContainer => {
            tetriminoContainer.position.set(
                0,
                tetriminoContainer.position.y - CONTAINER_SIZE
            );
        });

        //Render New Tetrimino
        this.renderSingleTetriminoContainer(
            this.tetriminosContainers.length,
            color
        );

    }
}
