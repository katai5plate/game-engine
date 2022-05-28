import * as PIXI from "pixi.js";
import { Touch } from "../../objects/Touch";

export class TouchableSprite extends PIXI.Sprite {
  #touch: Touch;
  constructor(
    texture: PIXI.Texture,
    { x, y }: { x?: number; y?: number } = {}
  ) {
    super(texture);
    this.#touch = new Touch();
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.interactive = true;
    this.buttonMode = true;
    this.on("pointerdown", this.#onDown)
      .on("pointerup", this.#onUp)
      .on("pointerupoutside", this.#onUp)
      .on("pointerover", this.#onOver)
      .on("pointerout", this.#onOut)
      // マウス限定
      .on("mousedown", this.#onDown)
      .on("mouseup", this.#onUp)
      .on("mouseupoutside", this.#onUp)
      .on("mouseover", this.#onOver)
      .on("mouseout", this.#onOut)
      // タッチ限定
      .on("touchstart", this.#onDown)
      .on("touchend", this.#onUp)
      .on("touchendoutside", this.#onUp);
  }
  onNormal() {
    // 継承先のために残す
  }
  onDown() {
    // 継承先のために残す
  }
  onOver() {
    // 継承先のために残す
  }
  onClick() {
    // 継承先のために残す
  }
  #onDown() {
    this.#touch.onDown({
      onClick: this.onClick.bind(this),
      onDown: this.onDown.bind(this),
    });
  }
  #onUp() {
    this.#touch.onUp({
      onOver: this.onOver.bind(this),
      onNormal: this.onNormal.bind(this),
    });
  }
  #onOver() {
    this.#touch.onOver({
      onOver: this.onOver.bind(this),
    });
  }
  #onOut() {
    this.#touch.onOut({
      onNormal: this.onNormal.bind(this),
    });
  }
}
