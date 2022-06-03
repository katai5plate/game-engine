import * as PIXI from "pixi.js";
import { DebugManager } from "./components/managers/DebugManager";
import {
  KeyboardCodeNames,
  KeyboardManager,
} from "./components/managers/KeyboardManager";
import { ResizeManager } from "./components/managers/ResizeManager";
import { SceneManager } from "./components/managers/SceneManager";
import { WatchManager } from "./components/managers/WatcherManager";
import { SceneData } from "./components/objects/Scene";
import { toGlobalForDebug, uuid } from "./utils/helper";

export class App extends PIXI.Application {
  /** ゲームが始まって何秒経ったか */
  time: number = 0;
  deltaTime: number = 0;
  frameCount: number = 0;

  _appkey: string = uuid();

  _key: KeyboardManager;
  _watcher: WatchManager;
  // #resizer: ResizeManager;
  #scener: SceneManager;
  // #debugger?: DebugManager;

  constructor(
    initialScene: SceneData<any>,
    options: PIXI.IApplicationOptions & {
      title: string;
    }
  ) {
    const { title, ...rest } = options;
    super(rest);
    globalThis.$app = this;
    document.title = title;
    document.body.appendChild(this.view);

    this._key = new KeyboardManager();
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
      this._watcher._update(deltaTime);
    });
  }
  getKey(code: KeyboardCodeNames) {
    return {
      isPressed: this._key.isPressed(code),
      isTriggered: this._key.isTriggered(code),
      isNotPressed: this._key.isNotPressed(code),
    };
  }
  async sceneTo(sceneData: SceneData<any>) {
    this.#scener._gotoScene(sceneData);
  }
}
