import * as PIXI from "pixi.js";

export class Touch extends PIXI.Sprite {
  isDown: boolean = false;
  isOver: boolean = false;
  onDown(_: { onClick?: () => void; onDown?: () => void }) {
    if (!this.isDown) _.onClick?.();
    this.isDown = true;
    _.onDown?.();
  }
  onUp(_: { onOver?: () => void; onNormal?: () => void }) {
    this.isDown = false;
    if (this.isOver) {
      _.onOver?.();
    } else {
      _.onNormal?.();
    }
  }
  onOver(_: { onOver?: () => void }) {
    this.isOver = true;
    if (this.isDown) {
      return;
    }
    _.onOver?.();
  }
  onOut(_: { onNormal?: () => void }) {
    this.isOver = false;
    if (this.isDown) {
      return;
    }
    _.onNormal?.();
  }
}
