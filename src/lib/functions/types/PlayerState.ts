import {ArraySchema, Schema, type} from "@colyseus/schema";

export class Block extends Schema {
    @type("number") x: number = 0;
    @type("number") y: number = 0;
    @type("number") value: number = 0;
}

export class Tetrimino extends Schema {
    @type("number") x: number = 0;
    @type("number") y: number = 0;
    @type("number") rotation: number = 0;
    @type("number") color: number = 0;

}

export class Player extends Schema {
    @type([Block]) board: ArraySchema<Block> = new ArraySchema<Block>;
    @type(Tetrimino) currentTetrimino: Tetrimino = new Tetrimino();
    @type(Tetrimino) shadowTetrimino: Tetrimino = new Tetrimino();
    @type("number") score: number = 0;
    @type("boolean") isGameOver: boolean = false;
    @type(["number"]) nextTetriminos: ArraySchema<number> = new ArraySchema<number>();
    @type(["number"]) deletedLines: ArraySchema<number> = new ArraySchema<number>();
    @type("number") numberAddedLines: number = 0;
    @type("boolean") currentTetriminoFreezed: boolean = false;
}
