import { Asset } from "../../components/objects/Asset";
import { createScene, Scene } from "../../components/objects/Scene";
import { Flow } from "../../components/objects/Flow";
import Cloud from "easyrpg-rtp/Picture/Cloud.png";
import { PhysicsSprite } from "../../components/objects/PhysicsSprite";
import { Rect, XY } from "../../components/objects/math";
import { hit } from "../../utils/math";

export const TestScene = createScene(
  [Cloud],
  class extends Scene {
    player: PhysicsSprite;
    bounds: {
      top: Rect;
      bottom: Rect;
      left: Rect;
      right: Rect;
    };

    // ゲームオブジェクトや内部変数の初期設定
    constructor() {
      super();
      this.player = this.spawn(
        new PhysicsSprite(new Asset(Cloud).toTexture(), {
          position: new XY(0, 0),
          delta: new XY(1 + Math.random() * 2, 1 + Math.random() * 2).mul(
            Math.random() * 10
          ),
          gravity: 0.3,
        })
      );
      this.bounds = {
        top: new Rect(0, -100, 320, 100),
        bottom: new Rect(0, 240, 320, 100),
        left: new Rect(-100, 0, 100, 240),
        right: new Rect(320, 0, 100, 240),
      };

      // new PhysicsSprite(new Asset(Cloud).toTexture(), {
      //   position: new XY(200, 200),
      // }),

      this.ready();
    }

    async main() {
      Flow.loop(async () => {
        this.updatePhysics();
        if (hit(this.player.getRect(), this.bounds.top)) {
          this.player.setPosition(
            ({ x, y }) => new XY(x, this.bounds.top.bottom + 1)
          );
          this.player.setDelta(({ x, y }) => new XY(x, -y));
        }
        if (hit(this.player.getRect(), this.bounds.bottom)) {
          this.player.setPosition(
            ({ x, y }) =>
              new XY(
                x,
                this.bounds.bottom.top - this.player.getRect().height - 1
              )
          );
          this.player.setDelta(({ x, y }) => new XY(x, -y));
        }
        if (hit(this.player.getRect(), this.bounds.left)) {
          this.player.setPosition(
            ({ x, y }) => new XY(this.bounds.left.right + 1, y)
          );
          this.player.setDelta(({ x, y }) => new XY(-x, y));
        }
        if (hit(this.player.getRect(), this.bounds.right)) {
          this.player.setPosition(
            ({ x, y }) =>
              new XY(
                this.bounds.right.left - this.player.getRect().width - 1,
                y
              )
          );
          this.player.setDelta(({ x, y }) => new XY(-x, y));
        }
        // if (hit(this.player.getRect(), this.bounds.left)) {
        //   this.player.setDelta(({ x, y }) => new XY(-x, y));
        // }
        // if (hit(this.player.getRect(), this.bounds.right)) {
        //   this.player.setDelta(({ x, y }) => new XY(-x, y));
        // }
        // if(this.player.getRect().bottom >= $app.screenRect().bottom){
        //   this.player.setPosition(({x,y})=>new XY(x,))
        // }
      });
    }
  }
);
