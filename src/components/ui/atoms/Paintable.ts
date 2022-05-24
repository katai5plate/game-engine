import * as PIXI from "pixi.js";
import { Sprite } from "pixi.js";

export class Paintable extends PIXI.Graphics {
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }
  toTexture() {
    return $app.renderer.generateTexture(this);
  }
  toSprite() {
    return new Sprite(this.toTexture());
  }
}
