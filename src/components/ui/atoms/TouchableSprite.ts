import * as PIXI from "pixi.js";

export class TouchableSprite extends PIXI.Sprite {
  isDown: boolean = false;
  isOver: boolean = false;
  constructor(
    texture: PIXI.Texture,
    { x, y }: { x?: number; y?: number } = {}
  ) {
    super(texture);
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.interactive = true;
    this.buttonMode = true;
    this.on("pointerdown", this.#onDownProcess)
      .on("pointerup", this.#onUpProcess)
      .on("pointerupoutside", this.#onUpProcess)
      .on("pointerover", this.#onOverProcess)
      .on("pointerout", this.#onOutProcess)
      // マウス限定
      .on("mousedown", this.#onDownProcess)
      .on("mouseup", this.#onUpProcess)
      .on("mouseupoutside", this.#onUpProcess)
      .on("mouseover", this.#onOverProcess)
      .on("mouseout", this.#onOutProcess)
      // タッチ限定
      .on("touchstart", this.#onDownProcess)
      .on("touchend", this.#onUpProcess)
      .on("touchendoutside", this.#onUpProcess);
  }
  onNomal() {}
  onDown() {}
  onOver() {}
  onClick() {}
  #onDownProcess() {
    if (!this.isDown) this.onClick();
    this.isDown = true;
    this.onDown();
  }
  #onUpProcess() {
    this.isDown = false;
    if (this.isOver) {
      this.onOver();
    } else {
      this.onNomal();
    }
  }
  #onOverProcess() {
    this.isOver = true;
    if (this.isDown) {
      return;
    }
    this.onOver();
  }
  #onOutProcess() {
    this.isOver = false;
    if (this.isDown) {
      return;
    }
    this.onNomal();
  }
}
