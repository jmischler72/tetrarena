import * as PIXI from 'pixi.js';
import type { Sprite } from 'pixi.js';
import type Board from '../Board/Board';

export default class DisconnectedOverlay extends PIXI.Container {
  private readonly background: Sprite;
  private readonly text: PIXI.Text;
  private readonly dtext: PIXI.Text;

  constructor(board: Board) {
    super();
    this.sortableChildren = true;

    this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.background.width = board.width;
    this.background.height = board.height;
    this.background.tint = 0x222201;
    this.background.alpha = 0.6;

    this.text = new PIXI.Text('20', {
      fontSize: 30,
      stroke: '#000',
      strokeThickness: 2,
      fill: 0xffffff,
      align: 'center',
    });
    this.text.anchor.set(0.5, 0.5);

    this.text.position.set(this.background.width / 2, this.background.height / 2);
    this.text.zIndex = 2;

    let counter = 20;

    const intervalId = setInterval(() => {
      this.text.text = counter;
      counter = counter - 1;
      if (counter === 0) clearInterval(intervalId);
    }, 1000);

    this.dtext = new PIXI.Text('Disconnected', {
      fontSize: 30,
      stroke: '#000',
      strokeThickness: 2,
      fill: 0xffffff,
      align: 'center',
    });
    this.dtext.anchor.set(0.5, 0.5);

    this.dtext.position.set(this.background.width / 2, this.background.height / 2 - this.dtext.height - 10);
    this.dtext.zIndex = 2;

    this.addChild(this.background, this.text, this.dtext);
  }
}
