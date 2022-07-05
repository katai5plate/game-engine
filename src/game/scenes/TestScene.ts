import { Asset } from "../../components/objects/Asset";
import { createScene, Scene } from "../../components/objects/Scene";
import { Flow } from "../../components/objects/Flow";
import Cloud from "easyrpg-rtp/Picture/Cloud.png";
import { PhysicsSprite } from "../../components/objects/PhysicsSprite";
import { XY } from "../../components/objects/XY";

export const TestScene = createScene(
  [Cloud],
  class extends Scene {
    player: PhysicsSprite;
    bounds: PhysicsSprite[];

    // ゲームオブジェクトや内部変数の初期設定
    constructor() {
      super();
      this.player = this.spawn(
        new PhysicsSprite(new Asset(Cloud).toTexture(), {
          position: new XY(0, 0),
        })
      );
      this.player.setDelta(() => new XY(1, 1));
      this.bounds = [
        new PhysicsSprite(new Asset(Cloud).toTexture(), {
          position: new XY(200, 200),
        }),
      ].map((x) => this.spawn(x));

      this.ready();
    }

    // メイン処理設定
    async main() {
      // ループ処理を定義する
      // ここではキーボード操作を行う
      Flow.loop(async () => {
        this.updatePhysics();
        // if(this.player.getRect().bottom >= $app.screenRect().bottom){
        //   this.player.setPosition(({x,y})=>new XY(x,))
        // }
      });
    }
  }
);
