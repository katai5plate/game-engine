import * as PIXI from "pixi.js";
import { PhysicsSprite } from "./PhysicsSprite";

/**
 * シーンクラスで処理内容を定義
 * ```ts
 * class extends Scene {
 *   hoge: PIXI.Sprite;
 *   fuga: PIXI.Sprite;
 *   constructor() {
 *     super();
 *     // 初期スポーン
 *     this.hoge = this.spawn(new PIXI.Sprite());
 *     // 宣言のみ
 *     this.fuga = new PIXI.Sprite();
 *   }
 *   async main() {
 *     new Flow(this, async ($) => {
 *       // 1 秒待つ
 *       await Flow.time(1);
 *       // スポーンさせる
 *       $.spawn($.fuga);
 *       // ループ
 *       await Flow.loop(async () => {
 *         // 0.1 秒ごとに回転
 *         await Flow.time(0.1, () => {
 *           $.fuga.angle++;
 *         });
 *       });
 *     });
 *   }
 * };
 * ```
 */
export class Scene extends PIXI.Container {
  isReady: boolean;
  isPlaying: boolean;
  interactivePanel: PIXI.Sprite;

  #physicsSprites: Set<PhysicsSprite> = new Set();

  static assetUrls: string[] = [];

  constructor() {
    super();
    this.isReady = this.isPlaying = false;
    this.interactivePanel = new PIXI.Sprite();
    this.interactivePanel.width = $app.width;
    this.interactivePanel.height = $app.height;
    this.interactivePanel.interactive = true;
    $app._touch._setInteractivePanel(this.interactivePanel);
    this.spawn(this.interactivePanel);
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
   *     // this.spawn させない場合は記録されるがスポーンしない
   *     this.後発スポーン物 = new PIXI.Container();
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
    if (object instanceof PhysicsSprite) {
      this.#physicsSprites.add(object);
    }
    this.addChild(object);
    return object;
  }
  /** デスポーンさせる */
  despawn<T extends PIXI.Container>(object: T) {
    if (object instanceof PhysicsSprite) {
      this.#physicsSprites.delete(object);
    }
    this.removeChild(object);
  }
  updatePhysics() {
    this.#physicsSprites.forEach((entity) => {
      entity._update();
    });
  }
}

export interface SceneData<S extends Scene> {
  scene: { new (): S };
  assetUrls: () => string[];
}

/**
 * シーンを作成
 * @param preloadAssets 事前にロードする素材
 * @param scene シーンクラス定義
 */
export const createScene = <S extends Scene>(
  preloadAssets: string[],
  scene: { new (): S }
): SceneData<S> => ({ scene, assetUrls: () => preloadAssets });
