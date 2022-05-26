import * as PIXI from "pixi.js";
import { BrightnessFilter } from "../../filters/BrightnessFilter";
import { toGlobalForDebug } from "../../utils/helper";
import { lerp } from "../../utils/math";
import { Flow } from "../objects/Flow";
import { Scene } from "../objects/Scene";
import { Paintable } from "../ui/atoms/Paintable";
import { LabeledButton } from "../ui/molecules/LabeledButton";

export class InitScene extends Scene {
  button1: LabeledButton;
  button2: LabeledButton;
  constructor() {
    super();
    this.button1 = this.spawn(
      new LabeledButton(
        new Paintable(100, 100)
          .beginFill(0x888800)
          .drawRect(0, 0, 100, 100)
          .endFill()
          .toTexture(),
        "←",
        { x: 100, y: 100 }
      )
    );
    this.button2 = new LabeledButton(
      new Paintable(100, 100)
        .beginFill(0x008888)
        .drawRect(0, 0, 100, 100)
        .endFill()
        .toTexture(),
      "→",
      { x: 300, y: 100 }
    );
    this.ready();
  }
  async main() {
    new Flow(this, (start, $) =>
      start
        .then(Flow.time(1))
        .then(() => $.spawn($.button2))
        .then(
          Flow.loop((head) =>
            head.then(
              Flow.time(0.1, () => {
                $.button2.angle++;
              })
            )
          )
        )
    );
    new Flow(this.button1, (start, $) =>
      start.then(
        Flow.loop((head) => {
          const [rx, ry] = [
            100 + Math.random() * 700,
            100 + Math.random() * 500,
          ];
          const [ox, oy] = [$.x, $.y];
          return head
            .then(
              Flow.time(1, ({ resolvePer }) => {
                $.x = lerp("inOutExpo", $.x, rx, resolvePer);
                $.y = lerp("inOutBounce", $.y, ry, resolvePer);
              })
            )
            .then(
              Flow.time(0.5, ({ resolvePer }) => {
                $.x = lerp("inOutExpo", $.x, ox, resolvePer);
                $.y = lerp("inOutBounce", $.y, oy, resolvePer);
              })
            );
        })
      )
    );
  }
}
