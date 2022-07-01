import * as PIXI from "pixi.js";
import { DebugManager } from "./components/managers/DebugManager";
import {
  KeyboardCodeNames,
  KeyboardManager,
} from "./components/managers/KeyboardManager";
import { MouseManager } from "./components/managers/MouseManager";
import { ResizeManager } from "./components/managers/ResizeManager";
import { SceneManager } from "./components/managers/SceneManager";
import { WatchManager } from "./components/managers/WatcherManager";
import { SceneData } from "./components/objects/Scene";
import { TouchableSprite } from "./components/ui/atoms/TouchableSprite";
import { toGlobalForDebug, uuid } from "./utils/helper";

export class App extends PIXI.Application {
  /** ゲームが始まって何秒経ったか */
  time: number = 0;
  deltaTime: number = 0;
  frameCount: number = 0;
  width: number;
  height: number;

  _key: KeyboardManager;
  _mouse: MouseManager;
  _watcher: WatchManager;
  // #resizer: ResizeManager;
  #scener: SceneManager;
  // #debugger?: DebugManager;

  constructor(
    initialScene: SceneData<any>,
    options: PIXI.IApplicationOptions & {
      // 元からあるものを必須にする用
      width: number;
      height: number;
      // ここから固有
      title: string;
    }
  ) {
    const { title, ...rest } = options;
    super(rest);
    globalThis.$app = this;
    this.width = rest.width;
    this.height = rest.height;
    document.title = title;
    document.body.appendChild(this.view);

    this._key = new KeyboardManager();
    this._mouse = new MouseManager();
    this._watcher = new WatchManager();
    /* this.#resizer = */ new ResizeManager();
    this.#scener = new SceneManager();
    if (!!window?.$isTest) {
      /* this.#debugger = */ new DebugManager();
    }

    this.sceneTo(initialScene);
    this.ticker.add((deltaTime) => {
      this.deltaTime = deltaTime;
      this.time += deltaTime / this.ticker.FPS;
      this.frameCount++;

      this._key._update();
      this._mouse._update();
      this._watcher._update(deltaTime);
    });

    // ドット絵ぼやけ対策
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.view.style.imageRendering = "pixelated";
  }
  getKey() {
    return this._key;
  }
  getMouse() {
    return this._mouse;
  }
  async sceneTo(sceneData: SceneData<any>) {
    this.#scener._gotoScene(sceneData);
  }
}
