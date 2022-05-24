import * as PIXI from "pixi.js";
import { BrightnessFilter } from "../../filters/BrightnessFilter";
import { toGlobalForDebug } from "../../utils/helper";
import { lerp } from "../../utils/math";
import { Scene } from "../objects/Scene";
import { Paintable } from "../ui/atoms/Paintable";
import { LabeledButton } from "../ui/molecules/LabeledButton";

export class InitScene extends Scene {
  constructor() {
    super();
  }
  setup() {
    this.gameObjects = {
      button1: new LabeledButton(
        new Paintable(100, 100)
          .beginFill(0x888800)
          .drawRect(0, 0, 100, 100)
          .endFill()
          .toTexture(),
        "←",
        { x: 100, y: 100 }
      ),
      button2: new LabeledButton(
        new Paintable(100, 100)
          .beginFill(0x008888)
          .drawRect(0, 0, 100, 100)
          .endFill()
          .toTexture(),
        "→",
        { x: 300, y: 100 }
      ),
    };
    Object.values(this.gameObjects).forEach((o) => this.addChild(o));
    toGlobalForDebug({ ...this.gameObjects, BrightnessFilter });
  }
  update() {
    const { width, height } = $app.screen;
    const button1 = this.getGameObject<LabeledButton>("button1");
    button1.x = lerp(
      "inOutBack",
      button1.width / 2,
      width - button1.width / 2,
      ($app.time * 150) % width
    );
    const button2 = this.getGameObject<LabeledButton>("button2");
    button2.y = lerp(
      "outBounce",
      button2.height / 2,
      height - button2.height / 2,
      ($app.time * 200) % height
    );
  }
}
