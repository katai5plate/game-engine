import * as PIXI from "pixi.js";
import { toGlobalForDebug } from "../../utils";
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
    toGlobalForDebug(this.gameObjects);
  }
  update() {
    // this.getGameObject<LabeledButton>("button2").x += 0.5;
  }
}
