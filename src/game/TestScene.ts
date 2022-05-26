import { Flow } from "../components/objects/Flow";
import { Scene } from "../components/objects/Scene";
import { Paintable } from "../components/ui/atoms/Paintable";
import { LabeledButton } from "../components/ui/molecules/LabeledButton";
import { lerp } from "../utils/math";

export class TestScene extends Scene {
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
    new Flow(this.button2, (start, $) =>
      start
        .then(Flow.time(1))
        .then(() => this.spawn($))
        .then(
          Flow.loop((head) =>
            head.then(
              Flow.time(0.1, () => {
                $.angle++;
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
