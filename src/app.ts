import * as PIXI from "pixi.js";
import { DebugManager } from "./components/managers/DebugManager";
import { TouchManager } from "./components/managers/TouchManager";
import {
  KeyboardCodeNames,
  KeyboardManager,
} from "./components/managers/KeyboardManager";
import { MouseManager } from "./components/managers/MouseManager";
import { ResizeManager } from "./components/managers/ResizeManager";
import { SceneManager } from "./components/managers/SceneManager";
import { SynthManager } from "./components/managers/SynthManager";
import { WatchManager } from "./components/managers/WatcherManager";
import { SceneData } from "./components/objects/Scene";
import { TouchableSprite } from "./components/ui/atoms/TouchableSprite";
import { managerToUse, toGlobalForDebug, uuid } from "./utils/helper";
import { CameraManager } from "./components/managers/CameraManager";
import { Rect } from "./components/objects/math";

export class App extends PIXI.Application {
  /** ゲームが始まって何秒経ったか */
  time: number = 0;
  deltaTime: number = 0;
  frameCount: number = 0;
  width: number;
  height: number;
  worldWidth: number;
  worldHeight: number;

  _key: KeyboardManager;
  _mouse: MouseManager;
  _touch: TouchManager;
  _watcher: WatchManager;
  // #resizer: ResizeManager;
  #scener: SceneManager;
  // #debugger?: DebugManager;
  _synth: SynthManager;
  _camera: CameraManager;

  constructor(
    initialScene: SceneData<any>,
    options: PIXI.IApplicationOptions & {
      // 元からあるものを必須にする用
      width: number;
      height: number;
      // ここから固有
      title: string;
      worldWidth?: number;
      worldHeight?: number;
    }
  ) {
    const { title, ...rest } = options;
    super(rest);
    globalThis.$app = this;
    this.width = rest.width;
    this.height = rest.height;
    this.worldWidth = rest.worldWidth ?? 10000;
    this.worldHeight = rest.worldHeight ?? 10000;
    document.title = title;
    document.body.appendChild(this.view);

    this._key = new KeyboardManager();
    this._mouse = new MouseManager();
    this._touch = new TouchManager();
    this._watcher = new WatchManager();
    /* this.#resizer = */ new ResizeManager();
    this.#scener = new SceneManager();
    this._synth = new SynthManager();
    this._camera = new CameraManager();
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
      this._touch._update();
      this._watcher._update(deltaTime);
      this._camera._update();
    });

    // ドット絵ぼやけ対策
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.view.style.imageRendering = "pixelated";
  }
  get useKey() {
    return managerToUse(this._key);
  }
  get useMouse() {
    return managerToUse(this._mouse);
  }
  get useTouch() {
    return managerToUse(this._touch);
  }
  get useSynth() {
    return managerToUse(this._synth);
  }
  get useCamera() {
    return managerToUse(this._camera);
  }
  async sceneTo(sceneData: SceneData<any>) {
    this.#scener._gotoScene(sceneData);
  }
  screenRect() {
    return Rect.from(this.screen);
  }
  worldRect() {
    const camera = this._camera.getPosition();
    return new Rect(
      camera.x + this.screen.x,
      camera.y + this.screen.y,
      this.screen.width,
      this.screen.height
    );
  }
}
