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
    this.#touch = new Touch();
    const { onDown, onUp, onOver, onOut } = this.#touch.createInput();
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
    this.#touch.connectOutput({
      onClick: this.onClick.bind(this),
      onRelease: this.onRelease.bind(this),
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
      onNormal: this.onNormal.bind(this),
      onOver: this.onOver.bind(this),
      onPress: this.onPress.bind(this),
      onUnknown: this.onUnknown.bind(this),
    });
  }
  onBlur() {
    // 継承先のために残す
  }
  onRelease() {
    // 継承先のために残す
  }
  onFocus() {
    // 継承先のために残す
  }
  onClick() {
    // 継承先のために残す
  }
  onNormal() {
    // 継承先のために残す
  }
  onOver() {
    // 継承先のために残す
  }
  onPress() {
    // 継承先のために残す
  }
  onUnknown() {
    // 継承先のために残す
  }
}
