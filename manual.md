# ゲーム制作マニュアル

## ゲームのリリース方法

1. `npm run build` を実行
2. `dist/`, `libs/`, `index.html` を新しいフォルダにコピー
3. これをサーバーにアップするなり、圧縮して投稿サイトにアップするなりする

## クリエイター側が編集したり作るもの

- `src/index.ts`: ゲームの開始設定
- `src/presets/synth/`: ZzFX で鳴らす BGM や SE
- `src/presets/tilesets/`: Tilemap を使用する場合のタイル設定
- `src/game/scenes/`: ゲームで使用するシーン置き場
- `src/game/assets/`: ゲームで使用する素材置き場

## シーンの構成

```ts
import * as PIXI from "pixi.js";

import { Asset } from "../../components/objects/Asset";
import { createScene, Scene } from "../../components/objects/Scene";

import Sozai1 from "../assets/Sozai1.png";
// import Sozai2 from "../assets/Sozai2.png";
// import Sozai3 from "../assets/Sozai3.png";

export const CustomScene = createScene(
  // ここにプリロードする素材を置く
  [
    Sozai1,
    // Sozai2,
    // Sozai3,
  ],
  class extends Scene {
    // ここで使用するゲームオブジェクトや内部変数などを定義
    nanika: PIXI.Sprite;

    // ゲームオブジェクトや内部変数の初期設定
    constructor() {
      super();
      // nanika に Sozai1 から作ったスプライトを設定
      this.nanika = new Asset(Sozai1).toSprite();
      // nanika を初期スポーンする
      this.spawn(this.nanika);
      // 次のように書くことで、設定と同時に初期スポーン可能
      // this.nanika = this.spawn(new Asset(Sozai1).toSprite());

      // main() を実行する
      this.ready();
    }

    // メイン処理設定
    async main() {
      // ループ処理を定義する
      // ここではキーボード操作を行う
      Flow.loop(async () => {
        // 左キーが押された
        if ($app.useKey.isPressed("LEFT")) {
          // nanika の X 座標を 10 減算
          this.nanika.x -= 10;
        }
        // 右キーが押された
        if ($app.useKey.isPressed("RIGHT")) {
          // nanika の X 座標を 10 加算
          this.nanika.x += 10;
        }
        // 内部で Flow.loop を使用することも可能だが、await を使用すること
        // await Flow.loop(async () => {})
      });

      // 複数定義すると並列実行される
      // ここではアニメーションを行う
      Flow.loop(async () => {
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
        // 1 秒待つ
        await Flow.time(1);
        // tween2D を使用することで座標指定することも可能
        await Flow.tween2D(
          {
            // イージングを inOutExpo にする
            ease: {
              x: "inOutExpo",
              y: "inOutExpo",
            },
            // 0.5 秒で移動完了する
            time: 0.5,
            // 初期値の参照には内部の {x, y} が使用される
            from: this.nanika,
            // 完了値
            to: new PIXI.Point({
              x: this.nanika.x,
              y: this.nanika.y - 100,
            }),
          },
          // 値が変化したら nanika の座標に反映する
          ({ x, y }) => {
            this.nanika.x = x;
            this.nanika.y = y;
          }
        );
        // 1 秒待つ
        await Flow.time(1);
      });
    }
  }
);
```
