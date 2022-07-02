import Cloud from "easyrpg-rtp/Picture/Cloud.png";
import { Asset } from "../../components/objects/Asset";
import { Flow } from "../../components/objects/Flow";
import { createScene, Scene } from "../../components/objects/Scene";
import { LabeledButton } from "../../components/ui/molecules/LabeledButton";

export const ButtonTestScene = createScene(
  [Cloud],
  class extends Scene {
    enemy: LabeledButton;
    player1: LabeledButton;
    player2: LabeledButton;
    constructor() {
      super();
      this.enemy = new LabeledButton(new Asset(Cloud).toTexture(), "敵", {
        x: 100,
        y: 100,
      });
      this.player1 = this.spawn(
        new LabeledButton(new Asset(Cloud).toTexture(), "方向キー", {
          x: 300,
          y: 100,
        })
      );
      this.player2 = this.spawn(
        new LabeledButton(new Asset(Cloud).toTexture(), "WASD", {
          x: 300,
          y: 300,
        })
      );
      this.ready();
    }
    async main() {
      new Flow(this.player1, async ($) => {
        await Flow.loop(async (end) => {
          await Flow.use.moveLikeRPG($, 0.25, 48);
          if ($app.useKey.isTriggered("R")) {
            console.log("AAAA!");
            return end;
          }
        });
        console.log("ループ終了");
      });
      new Flow(this.player2, async ($) => {
        await Flow.loop(async (end) => {
          await Flow.use.moveLikeRPG($, 1, 48, {
            keys: {
              up: ["W", "NUMPAD8"],
              down: ["S", "NUMPAD2"],
              left: ["A", "NUMPAD4"],
              right: ["D", "NUMPAD6"],
            },
            ease: "outBounce",
          });
          if ($app.useKey.isTriggered("T")) {
            console.log("BBBB!");
            return end;
          }
        });
        console.log("ループ終了");
      });
      new Flow(this.enemy, async ($) => {
        await Flow.time(1);
        this.spawn($);
        await Flow.loop(async () => {
          await Flow.tween(
            {
              ease: "outElastic",
              time: 1,
              from: $.angle,
              to: $.angle + 45,
            },
            (x) => {
              $.angle = x;
            }
          );
          const origin = { x: $.x, y: $.y };
          await Flow.tween2D(
            {
              ease: {
                x: "inOutExpo",
                y: "inOutBounce",
              },
              time: 1,
              from: $,
              to: {
                x: 100 + Math.random() * 700,
                y: 100 + Math.random() * 500,
              },
            },
            ({ x, y }) => {
              $.x = x;
              $.y = y;
            }
          );
          await Flow.tween2D(
            {
              ease: "inOutCirc",
              time: 3,
              from: $,
              to: origin,
            },
            ({ x, y }) => {
              $.x = x;
              $.y = y;
            }
          );
        });
        console.error("ここには到達しない");
      });
    }
  }
);
