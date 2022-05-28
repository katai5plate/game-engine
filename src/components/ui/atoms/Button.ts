import * as PIXI from "pixi.js";
import { BrightnessFilter } from "../../../filters/BrightnessFilter";
import { TouchableSprite } from "./TouchableSprite";

export class Button extends TouchableSprite {
  isDown: boolean = false;
  isOver: boolean = false;
  brightnessFilter: BrightnessFilter;
  constructor(
    texture: PIXI.Texture,
    { x, y }: { x?: number; y?: number } = {}
  ) {
    super(texture, { x, y });
    this.anchor.set(0.5);
    this.brightnessFilter = new BrightnessFilter();
    this.filters = [this.brightnessFilter];
  }
  onNormal() {
    this.brightnessFilter.setBrightness(0);
  }
  onDown() {
    this.brightnessFilter.setBrightness(-0.25);
  }
  onOver() {
    this.brightnessFilter.setBrightness(0.25);
  }
  onClick() {
    // 継承先のために残す
  }
}
