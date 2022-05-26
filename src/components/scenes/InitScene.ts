import * as PIXI from "pixi.js";
import { BrightnessFilter } from "../../filters/BrightnessFilter";
import { toGlobalForDebug } from "../../utils/helper";
import { lerp } from "../../utils/math";
import { Flow } from "../objects/Flow";
import { Scene } from "../objects/Scene";
import { Paintable } from "../ui/atoms/Paintable";
import { LabeledButton } from "../ui/molecules/LabeledButton";

toGlobalForDebug({ Flow });
export class InitScene extends Scene {
  constructor() {
    super();
  }
  async setup() {
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
    const button1 = this.getGameObject<LabeledButton>("button1");
    new Flow(button1, (start, $) =>
      start
        // 2 秒待機
        .then(Flow.time(2))
        // ループ
        .then(
          Flow.loop((head) => {
            // ランダム座標
            const [rx, ry] = [
              100 + Math.random() * 700,
              100 + Math.random() * 500,
            ];
            // 元の座標
            const [ox, oy] = [$.x, $.y];
            return (
              head
                // 1 秒かけてランダム位置へ移動
                .then(
                  Flow.time(1, ({ resolvePer }) => {
                    $.x = lerp("inOutExpo", $.x, rx, resolvePer);
                    $.y = lerp("inOutBounce", $.y, ry, resolvePer);
                  })
                )
                // 0.5 秒かけて元の位置へ移動
                .then(
                  Flow.time(0.5, ({ resolvePer }) => {
                    $.x = lerp("inOutExpo", $.x, ox, resolvePer);
                    $.y = lerp("inOutBounce", $.y, oy, resolvePer);
                  })
                )
                // これを書かないとループしない。引数に数値を渡すとその回数分戻り、指定しないと無限ループ
                .then(Flow.loopBack())
            );
          })
        )
    );
  }
  update() {
    // const { width, height } = $app.screen;
    // const button1 = this.getGameObject<LabeledButton>("button1");
    // button1.x = lerp(
    //   "inOutBack",
    //   button1.width / 2,
    //   width - button1.width / 2,
    //   ($app.time * 150) % width
    // );
    // const button2 = this.getGameObject<LabeledButton>("button2");
    // button2.y = lerp(
    //   "outBounce",
    //   button2.height / 2,
    //   height - button2.height / 2,
    //   ($app.time * 200) % height
    // );
  }
}
