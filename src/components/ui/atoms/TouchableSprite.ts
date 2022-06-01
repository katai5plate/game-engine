import * as PIXI from "pixi.js";
import { Touch } from "../../objects/Touch";

export class TouchableSprite extends PIXI.Sprite {
  #touch: Touch;
  constructor(
    texture: PIXI.Texture,
    { x, y }: { x?: number; y?: number } = {}
  ) {
    super(texture);
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.interactive = true;
    this.buttonMode = true;
    this.#touch = new Touch().connect({
      onClick: this.onClick.bind(this),
      onDown: this.onDown.bind(this),
      onOver: this.onOver.bind(this),
      onNormal: this.onNormal.bind(this),
    });
    const [onDown, onUp, onOver, onOut] = [
      () => this.#touch.onDown(),
      () => this.#touch.onUp(),
      () => this.#touch.onOver(),
      () => this.#touch.onOut(),
    ];
    this.on("pointerdown", onDown)
      .on("pointerup", onUp)
      .on("pointerupoutside", onUp)
      .on("pointerover", onOver)
      .on("pointerout", onOut)
      // マウス限定
      .on("mousedown", onDown)
      .on("mouseup", onUp)
      .on("mouseupoutside", onUp)
      .on("mouseover", onOver)
      .on("mouseout", onOut)
      // タッチ限定
      .on("touchstart", onDown)
      .on("touchend", onUp)
      .on("touchendoutside", onUp);
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
}
