import * as PIXI from "pixi.js";
import { Scene } from "./components/objects/Scene";

export class App extends PIXI.Application {
  currentScene: Scene;
  constructor(
    initialScene: { new (): Scene },
    options: PIXI.IApplicationOptions & {}
  ) {
    const { ...rest } = options;
    super(rest);
    globalThis.$app = this;

    this.currentScene = new initialScene();
    this.stage.addChild(this.currentScene);
    this.ticker.add((deltaTime) => {
      this.currentScene.update(deltaTime);
    });

    if (!!window?.$isTest) {
      const win = window as any;
      // Pixi DevTools
      win?.__PIXI_INSPECTOR_GLOBAL_HOOK__?.register({ PIXI });
      // VConsole (HTMLから読み込み)
      if (win?.VConsole) new win.VConsole();
    }

    document.body.appendChild(this.view);

    window.addEventListener("resize", () => {
      this.#onResize();
    });
    this.#onResize();
  }
  /** シーン遷移 */
  gotoScene(scene: { new (): Scene }) {
    this.currentScene = new scene();
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
}
