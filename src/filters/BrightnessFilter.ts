import * as PIXI from "pixi.js";

/** 明るさフィルター */
export class BrightnessFilter extends PIXI.filters.ColorMatrixFilter {
  constructor() {
    super();
  }
  /** @param v -1 - 1 */
  setBrightness(v: number) {
    const b = 1 - v;
    this.matrix = [
      ...[b, 0, 0, 0, v],
      ...[0, b, 0, 0, v],
      ...[0, 0, b, 0, v],
      ...[0, 0, 0, 1, 0],
    ] as typeof this.matrix;
    return this;
  }
}
