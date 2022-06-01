import * as PIXI from "pixi.js";

export class Touch {
  isDown: boolean = false;
  isOver: boolean = false;
  callbacks: {
    onClick?: () => void;
    onDown?: () => void;
    onOver?: () => void;
    onNormal?: () => void;
  } = {};
  connect(_: {
    onClick?: () => void;
    onDown?: () => void;
    onOver?: () => void;
    onNormal?: () => void;
  }) {
    this.callbacks = _;
    return this;
  }
  onDown() {
    if (!this.isDown) this.callbacks.onClick?.();
    this.isDown = true;
    this.callbacks.onDown?.();
  }
  onUp() {
    this.isDown = false;
    if (this.isOver) {
      this.callbacks.onOver?.();
    } else {
      this.callbacks.onNormal?.();
    }
  }
  onOver() {
    this.isOver = true;
    if (this.isDown) {
      return;
    }
    this.callbacks.onOver?.();
  }
  onOut() {
    this.isOver = false;
    if (this.isDown) {
      return;
    }
    this.callbacks.onNormal?.();
  }
}
