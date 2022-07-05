import * as PIXI from "pixi.js";
import { inside } from "../../utils/math";
import { XY } from "../objects/XY";

/**
 * InteractivePanel関連
 */
export class TouchManager {
  #currentPanel?: PIXI.Sprite;
  #touchTime?: number;

  /** MouseManager転送用 */
  #singlePosition: XY = new XY(0, 0);
  #multiPosition: XY[] = [];
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
    this.#singlePosition = XY.from(e.data.global);
    this.#multiPosition = [
      ...(((e.data.originalEvent as TouchEvent).changedTouches as any) || []),
    ].map(({ globalX, globalY }) => new XY(globalX, globalY));
  }
  #onPointerDown(e: PIXI.InteractionEvent) {
    this.#updateTouchData(e);
    if (!inside($app.screenRect(), XY.from(e.data.global))) return;
    if (this.#touchTime === undefined) {
      this.#touchTime = 0;
    }
  }
  #onPointerUp(e: PIXI.InteractionEvent) {
    this.#updateTouchData(e);
    this.#touchTime = undefined;
  }
  #onPointerMove(e: PIXI.InteractionEvent) {
    this.#updateTouchData(e);
    if (!inside($app.screenRect(), XY.from(e.data.global))) {
      console.log(111);
      this.#touchTime = undefined;
    }
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
  getScreenPosition() {
    return $app._touch.#singlePosition;
  }
  getScreenPositions() {
    return $app._touch.#multiPosition;
  }
  getWorldPosition() {
    const worldPos = $app._camera.getPosition();
    return new XY(
      worldPos.x + $app._touch.#singlePosition.x,
      worldPos.y + $app._touch.#singlePosition.y
    );
  }
  getWorldPositions() {
    const worldPos = $app._camera.getPosition();
    return $app._touch.#multiPosition.map(
      ({ x, y }) => new XY(worldPos.x + x, worldPos.y + y)
    );
  }
}
