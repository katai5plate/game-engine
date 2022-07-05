import * as PIXI from "pixi.js";

export class PhysicsSprite extends PIXI.Sprite {
  #position: PIXI.Point;
  // #system?: dc.System;
  #delta: PIXI.Point = new PIXI.Point(0, 0);
  #accel: PIXI.Point = new PIXI.Point(0, 0);
  constructor(
    texture: PIXI.Texture<PIXI.Resource> | undefined,
    params: {
      position: PIXI.Point;
    }
  ) {
    super(texture);
    this.#position = params.position;
    this.#updatePosition();
  }
  setPosition(value: PIXI.Point | ((position: PIXI.Point) => PIXI.Point)) {
    const position =
      typeof value === "function" ? value(this.#position) : value;
    this.#position = position;
    this.#updatePosition();
  }
  getRect() {
    return new PIXI.Rectangle(
      this.#position.x,
      this.#position.y,
      this.#position.x + this.width,
      this.#position.y + this.height
    );
  }
  getPosition() {
    return this.#position;
  }
  setDelta(value: PIXI.Point | ((delta: PIXI.Point) => PIXI.Point)) {
    this.#delta = typeof value === "function" ? value(this.#delta) : value;
  }
  setAccel(value: PIXI.Point | ((accel: PIXI.Point) => PIXI.Point)) {
    this.#accel = typeof value === "function" ? value(this.#accel) : value;
  }
  _update() {
    this.#updatePosition();
  }
  #updatePosition() {
    this.#delta = new PIXI.Point(
      this.#delta.x + this.#accel.x,
      this.#delta.y + this.#accel.y
    );
    this.#position = new PIXI.Point(
      this.#position.x + this.#delta.x,
      this.#position.y + this.#delta.y
    );
    this.x = this.#position.x;
    this.y = this.#position.y;
  }
}
