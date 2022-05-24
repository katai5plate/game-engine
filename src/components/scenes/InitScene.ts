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
    this.addChild(button);
    toGlobalForDebug({ button });
  }
}
