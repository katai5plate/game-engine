import * as PIXI from "pixi.js";

type PointerValues =
  | "DOWN"
  | "CENTER_DOWN"
  | "RIGHT_DOWN"
  | "CLICK"
  | "DOUBLE_CLICK"
  | "RIGHT_CLICK"
  | "WHEEL_DOWN"
  | "WHEEL_UP";

/**
 * InteractivePanel関連
 */
export class TouchManager {
  #currentPanel?: PIXI.Sprite;
  #touchTime?: number = 0;

  /** MouseManager転送用 */
  #singlePosition: PIXI.Point = new PIXI.Point(0, 0);
  #multiPosition: PIXI.Point[] = [];
  constructor() {}
  _setInteractivePanel(panel: PIXI.Sprite) {
    this.#currentPanel = panel;
    this.#currentPanel.on("pointerdown", this.#onPointerDown.bind(this));
    this.#currentPanel.on("pointerup", this.#onPointerUp.bind(this));
    this.#currentPanel.on("pointerleave", this.#onPointerUp.bind(this));
    this.#currentPanel.on("pointerout", this.#onPointerUp.bind(this));
    this.#currentPanel.on("pointermove", this.#onPointerMove.bind(this));
    this.#currentPanel.on("pointerover", this.#onPointerMove.bind(this));
  }
  _update() {
    if (this.#touchTime !== undefined) {
      this.#touchTime++;
    }
  }
  #updateTouchData(e: PIXI.InteractionEvent) {
    this.#singlePosition = e.data.global;
    this.#multiPosition = [
      ...((e.data.originalEvent as TouchEvent).changedTouches as any),
    ].map(({ globalX, globalY }) => new PIXI.Point(globalX, globalY));
  }
  #onPointerDown(e: PIXI.InteractionEvent) {
    console.log(111);
    this.#updateTouchData(e);
    if (this.#touchTime === undefined) {
      this.#touchTime = 0;
    }
  }
  #onPointerUp(e: PIXI.InteractionEvent) {
    console.log(122, this.#touchTime);
    this.#updateTouchData(e);
    this.#touchTime = undefined;
  }
  #onPointerMove(e: PIXI.InteractionEvent) {
    this.#updateTouchData(e);
  }
  isClicked() {
    return this.#touchTime === 1;
  }
  isPressed() {
    return !!this.#touchTime;
  }
  isNotPressed() {
    return !this.#touchTime;
  }
  getPosition() {
    return $app._touch.#singlePosition;
  }
  getPositions() {
    return $app._touch.#multiPosition;
  }
}
