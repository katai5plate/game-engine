import Cloud from "easyrpg-rtp/Picture/Cloud.png";
import { Asset } from "../components/objects/Asset";
import { Flow } from "../components/objects/Flow";
import { createScene, Scene } from "../components/objects/Scene";
import { LabeledButton } from "../components/ui/molecules/LabeledButton";
import { lerp } from "../utils/math";

export const TestScene = createScene(
  [Cloud],
  class extends Scene {
    button1: LabeledButton;
    button2: LabeledButton;
    constructor() {
      super();
      this.button1 = this.spawn(
        new LabeledButton(new Asset(Cloud).toTexture(), "←", {
          x: 100,
          y: 100,
        })
      );
      this.button2 = new LabeledButton(new Asset(Cloud).toTexture(), "→", {
        x: 300,
        y: 100,
      });
      this.ready();
    }
    async main() {
      new Flow(this, async ($) => {
        await Flow.time(1);
        this.spawn($.button2);
        await Flow.loop(async () => {
          $.button1.angle++;
          $.button2.angle += 5;
          if ($app.key.isPressed("LEFT")) {
            $.button2.x -= 10;
          }
          if ($app.key.isPressed("RIGHT")) {
            $.button2.x += 10;
          }
          if ($app.key.isPressed("UP")) {
            $.button2.y -= 10;
          }
          if ($app.key.isPressed("DOWN")) {
            $.button2.y += 10;
          }
          if ($app.key.isTriggered("A")) {
            console.log("AAAA!");
          }
        });
      });
      new Flow(this.button1, async ($) => {
        await Flow.loop(async () => {
          const [rx, ry] = [
            100 + Math.random() * 700,
            100 + Math.random() * 500,
          ];
          const [ox, oy] = [$.x, $.y];
          await Flow.time(1, ({ resolvePer }) => {
            $.x = lerp("inOutExpo", $.x, rx, resolvePer);
            $.y = lerp("inOutBounce", $.y, ry, resolvePer);
          });
          await Flow.time(0.5, ({ resolvePer }) => {
            $.x = lerp("inOutExpo", $.x, ox, resolvePer);
            $.y = lerp("inOutBounce", $.y, oy, resolvePer);
          });
        });
        console.error("ここには到達しない");
      });
    }
  }
);

import * as PIXI from "pixi.js";

const x = class ExampleScene extends Scene {
  // 1. ここで型定義
  初期スポーン物: PIXI.Container;
  後発スポーン物: PIXI.Container;
  constructor() {
    super();
    // 2. これで宣言とともにスポーン
    this.初期スポーン物 = this.spawn(new PIXI.Container());
    // this.spawn させない場合は記録されるがスポーンしない
    this.後発スポーン物 = new PIXI.Container();
    this.ready();
  }
  async main() {
    // 3. 任意のタイミングでスポーン
    this.spawn(this.後発スポーン物);
  }
};
