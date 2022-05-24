import * as PIXI from "pixi.js";
import { toGlobalForDebug } from "../../utils";
import { Scene } from "../objects/Scene";
import { LabeledButton } from "../ui/molecules/LabeledButton";

export class InitScene extends Scene {
  constructor() {
    super();
  }
  setup() {
    const button = new LabeledButton(
      $app.renderer.generateTexture(
        new PIXI.Graphics()
          .beginFill(0x888800)
          .drawRect(0, 0, 100, 100)
          .endFill()
      ),
      "wfojfeiwjof",
      { x: 100, y: 100 }
    );
    const button2 = new LabeledButton(
      $app.renderer.generateTexture(
        new PIXI.Graphics()
          .beginFill(0x888800)
          .drawRect(0, 0, 100, 100)
          .endFill()
      ),
      "fejiwjfe",
      { x: 300, y: 100 }
    );
    this.addChild(button);
    this.addChild(button2);
    toGlobalForDebug({ button, button2 });
  }
}
