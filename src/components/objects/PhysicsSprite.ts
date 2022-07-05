import * as PIXI from "pixi.js";
import { Rect, Shape, XY } from "./math";

export class PhysicsSprite extends PIXI.Sprite {
  #position: XY;
  #delta: XY = new XY(0, 0);
  #accel: XY = new XY(0, 0);
  constructor(
    texture: PIXI.Texture<PIXI.Resource> | undefined,
    params: {
      position: XY;
    }
  ) {
    super(texture);
    this.#position = params.position;
    this.#updatePosition();
  }
  setPosition(value: XY | ((position: XY) => XY)) {
    const position =
      typeof value === "function" ? value(this.#position) : value;
    this.#position = position;
    this.#updatePosition();
  }
  getRect() {
    return new Rect(
      this.#position.x,
      this.#position.y,
      this.width,
      this.height
    );
  }
  getPosition() {
    return this.#position;
  }
  setDelta(value: XY | ((delta: XY) => XY)) {
    this.#delta = typeof value === "function" ? value(this.#delta) : value;
  }
  setAccel(value: XY | ((accel: XY) => XY)) {
    this.#accel = typeof value === "function" ? value(this.#accel) : value;
  }
  _update() {
    this.#updatePosition();
  }
  #updatePosition() {
    this.#delta = new XY(
      this.#delta.x + this.#accel.x,
      this.#delta.y + this.#accel.y
    );
    this.#position = new XY(
      this.#position.x + this.#delta.x,
      this.#position.y + this.#delta.y
    );
    this.x = this.#position.x;
    this.y = this.#position.y;
  }
}
