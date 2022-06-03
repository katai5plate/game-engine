import * as PIXI from "pixi.js";
import {
  KeyboardCodeNames,
  KeyboardCodeValues,
  KeyboardManager,
} from "./components/managers/KeyboardManager";
import { WatcherManager } from "./components/managers/WatcherManager";
import { Scene, SceneData } from "./components/objects/Scene";
import { toGlobalForDebug } from "./utils/helper";

export class App extends PIXI.Application {
  currentScene: Scene = new Scene();
  /** ゲームが始まって何秒経ったか */
  time: number = 0;
  deltaTime: number = 0;
  frameCount: number = 0;
  /** ゲーム非同期監視リスト */
  // #watchers: Set<Watcher> = new Set();

  _key: KeyboardManager;
  _watcher: WatcherManager;

  constructor(
    initialScene: SceneData<any>,
    options: PIXI.IApplicationOptions & {}
  ) {
    const { ...rest } = options;
    super(rest);
    globalThis.$app = this;

    this._key = new KeyboardManager();
    this._watcher = new WatcherManager();

    this.gotoScene(initialScene);
    this.ticker.add((deltaTime) => {
      this.deltaTime = deltaTime;
      this.time += deltaTime / this.ticker.FPS;
      this.frameCount++;

      this._key._update();
      this._watcher._update(deltaTime);
    });

    if (!!window?.$isTest) {
      const win = window as any;
      // Pixi DevTools
      toGlobalForDebug({ PIXI });
      // VConsole (HTMLから読み込み)
      if (win?.VConsole) toGlobalForDebug({ $vc: new win.VConsole() });
    }

    document.body.appendChild(this.view);

    window.addEventListener("resize", () => {
      this.#onResize();
    });
    this.#onResize();
  }
  /** シーン遷移 */
  async gotoScene(sceneData: SceneData<any>) {
    this.stage.removeChild(this.currentScene);
    console.time("SCENE LOADED");
    console.log("SCENE LOADING... (PRELOAD ASSETS)");
    sceneData.assetUrls.forEach((url: string) =>
      this.loader.add(url, `./dist/${url}`)
    );
    await new Promise((r) => this.loader.load(r));
    this.currentScene = new sceneData.scene();
    this.stage.addChild(this.currentScene);
    console.timeEnd("SCENE LOADED");
  }
  /** リサイズ時に自動的に黒枠を再調整する */
  #onResize() {
    const { innerWidth, innerHeight } = window;
    const { width, height } = this.stage;
    const { scrollWidth, scrollHeight } = this.view;
    // 横長
    if (width > height) {
      if (innerWidth > scrollWidth) {
        this.view.style.width = "auto";
        this.view.style.height = "100%";
      } else {
        this.view.style.width = "100%";
        this.view.style.height = "auto";
      }
      return;
    }
    // 縦長
    if (width < height) {
      if (innerHeight > scrollHeight && scrollHeight !== 0) {
        this.view.style.width = "100%";
        this.view.style.height = "auto";
      } else {
        this.view.style.width = "auto";
        this.view.style.height = "100%";
      }
      return;
    }
    // 一致
    if (innerWidth < innerHeight) {
      this.view.style.width = "100%";
      this.view.style.height = "auto";
    } else {
      this.view.style.width = "auto";
      this.view.style.height = "100%";
    }
    return;
  }
  getKey(code: KeyboardCodeNames) {
    return {
      isPressed: this._key.isPressed(code),
      isTriggered: this._key.isTriggered(code),
      isNotPressed: this._key.isNotPressed(code),
    };
  }
}
