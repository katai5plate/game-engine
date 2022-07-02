// 描画エンジンの機能
import * as PIXI from "pixi.js";

// ゲームエンジンの機能
import { Asset } from "../../components/objects/Asset";
import { createScene, Scene } from "../../components/objects/Scene";
import { Flow } from "../../components/objects/Flow";

// 素材の読み込み
import Cloud from "easyrpg-rtp/Picture/Cloud.png";

export const TestScene = createScene(
  // ここにプリロードする素材を置く
  [Cloud],
  class extends Scene {
    // ここで使用するゲームオブジェクトや内部変数などを定義
    nanika: PIXI.Sprite;
    isTweenPlaying: boolean;

    // ゲームオブジェクトや内部変数の初期設定
    constructor() {
      super();
      // nanika に Sozai1 から作ったスプライトを設定
      this.nanika = new Asset(Cloud).toSprite();
      // nanika を初期スポーンする
      this.spawn(this.nanika);
      // 次のように書くことで、設定と同時に初期スポーン可能
      // this.nanika = this.spawn(new Asset(Sozai1).toSprite());

      // 「アニメーション中かどうか」を意味する変数を定義
      this.isTweenPlaying = false;

      // main() を実行する
      this.ready();
    }

    // メイン処理設定
    async main() {
      // ループ処理を定義する
      // ここではキーボード操作を行う
      Flow.loop(async () => {
        // isTweenPlaying が false のとき...
        if (this.isTweenPlaying === false) {
          // 左キーが押されたら...
          if ($app.useKey.isPressed("LEFT")) {
            // nanika の X 座標を 10 減算
            this.nanika.x -= 10;
          }
          // 右キーが押されたら...
          if ($app.useKey.isPressed("RIGHT")) {
            // nanika の X 座標を 10 加算
            this.nanika.x += 10;
          }
        }
        // 内部で Flow.loop を使用することも可能だが、await を使用すること
        // await Flow.loop(async () => {})
      });

      // 複数定義すると並列実行される
      // ここではアニメーションを行う
      Flow.loop(async () => {
        // アニメーションを始める前に isTweenPlaying を true にする
        this.isTweenPlaying = true;
        // nanika の移動アニメーションを実行
        await Flow.tween(
          {
            // イージングを inOutExpo にする
            ease: "inOutExpo",
            // 0.5 秒で移動完了する
            time: 0.5,
            // 初期値
            from: this.nanika.y,
            // 完了値
            to: this.nanika.y + 100,
          },
          // 値が変化したら nanika の Y 座標に反映する
          (value) => {
            this.nanika.y = value;
          }
        );
        // アニメーションが終わったので isTweenPlaying を false にする
        this.isTweenPlaying = false;
        // 1 秒待つ
        await Flow.time(1);

        this.isTweenPlaying = true;
        // tween2D を使用することで座標指定することも可能
        await Flow.tween2D(
          {
            // イージングを inOutExpo にする
            ease: "inOutExpo",
            // 座標それぞれの挙動を変更することも可能
            // ease: {
            //   x: "inOutExpo",
            //   y: "inOutExpo",
            // },
            // 0.5 秒で移動完了する
            time: 0.5,
            // 初期値の参照には内部の {x, y} が使用される
            from: this.nanika,
            // 完了値
            to: new PIXI.Point(this.nanika.x, this.nanika.y - 100),
          },
          // 値が変化したら nanika の座標に反映する
          ({ x, y }) => {
            this.nanika.x = x;
            this.nanika.y = y;
          }
        );
        this.isTweenPlaying = false;
        await Flow.time(1);
      });
    }
  }
);
