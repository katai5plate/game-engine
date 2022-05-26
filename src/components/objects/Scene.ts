import * as PIXI from "pixi.js";

/**
 * シーンを作成
 * ```ts
 * class ExampleScene extends Scene {
 *   hoge: PIXI.Sprite;
 *   fuga: PIXI.Sprite;
 *   constructor() {
 *     super();
 *     // 初期スポーン
 *     this.hoge = this.spawn(new Sprite())
 *     // 宣言のみ
 *     this.fuga = new Sprite()
 *   }
 *   async main() {
 *     new Flow(this, (start, $) =>
 *       start
 *         // 1 秒待つ
 *         .then(Flow.time(1))
 *         // スポーンさせる
 *         .then(() => $.spawn($.fuga))
 *         // ループ
 *         .then(Flow.loop((head) =>
 *           head
 *             // 0.1 秒ごとに回転
 *             .then(Flow.time(0.1, () => {
 *               $.fuga.angle++;
 *             })
 *           )
 *         ))
 *     );
 *   }
 * }
 * ```
 */
export class Scene extends PIXI.Container {
  isReady: boolean;
  isPlaying: boolean;
  constructor() {
    super();
    this.isReady = this.isPlaying = false;
  }
  /** main() を実行 */
  ready() {
    this.isReady = this.isPlaying = true;
    this.main().finally(() => {
      this.isPlaying = false;
    });
  }
  /**
   * メインの処理。
   * - ループさせたい場合は `Flow.loop` を使用する
   */
  async main() {
    // ここに任意の処理
  }
  /**
   * スポーンさせる
   * ```ts
   * class ExampleScene extends Scene {
   *   // 1. ここで型定義
   *   初期スポーン物: PIXI.Container;
   *   後発スポーン物: PIXI.Container;
   *   constructor() {
   *     super();
   *     // 2. これで宣言とともにスポーン
   *     this.初期スポーン物 = this.spawn(new PIXI.Container());
   *     this.ready();
   *   }
   *   async main() {
   *     // 3. 任意のタイミングでスポーン
   *     this.spawn(this.後発スポーン物);
   *   }
   * }
   * ```
   */
  spawn<T extends PIXI.Container>(object: T) {
    this.addChild(object);
    return object;
  }
}
