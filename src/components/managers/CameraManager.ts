import { Viewport } from "pixi-viewport";
import * as cull from "pixi-cull";
import { XY } from "../objects/math";

/**
 * カメラ関連
 */
export class CameraManager {
  #viewport: Viewport;
  #culling: cull.Simple;
  constructor() {
    this.#viewport = new Viewport({
      screenWidth: $app.view.offsetWidth,
      screenHeight: $app.view.offsetHeight,
      worldWidth: $app.worldWidth,
      worldHeight: $app.worldHeight,
    });
    $app.stage.addChild(this.#viewport);
    this.#culling = new cull.Simple();
    this.#culling.addList(this.#viewport.children);
    this.#culling.cull(this.#viewport.getVisibleBounds());
  }
  _update() {
    if (this.#viewport.dirty) {
      this.#culling.cull(this.#viewport.getVisibleBounds());
      this.#viewport.dirty = false;
    }
  }
  getCamera() {
    return this.#viewport;
  }
  getPosition() {
    return this.#viewport.position;
  }
  setPosition(value: XY | ((prev: XY) => XY)) {
    let pos: XY;
    if (typeof value === "function") {
      pos = value(XY.from(this.#viewport.position));
    } else {
      pos = value;
    }
    this.#viewport.position.x = pos.x;
    this.#viewport.position.y = pos.y;
  }
}
