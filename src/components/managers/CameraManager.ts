import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
import * as cull from "pixi-cull";

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
      worldWidth: 1000,
      worldHeight: 1000,
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
  setPosition(value: PIXI.Point | ((prev: PIXI.Point) => PIXI.Point)) {
    let pos: PIXI.Point;
    if (typeof value === "function") {
      pos = value(this.#viewport.position);
    } else {
      pos = value;
    }
    this.#viewport.position.x = pos.x;
    this.#viewport.position.y = pos.y;
  }
}
