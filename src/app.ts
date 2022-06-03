import * as PIXI from "pixi.js";
import { Keyboard } from "./components/app/Keyboard";
import { Scene, SceneData } from "./components/objects/Scene";
import { toGlobalForDebug } from "./utils/helper";

export interface UpdateProps {
  time: number;
  deltaTime: number;
}

type FromTime = {
  resolveTime: number;
  resolvePer: number;
  resolveLeft: number;
  rejectTime?: number;
  rejectPer?: number;
  rejectLeft?: number;
};

export type ProgressProps = UpdateProps & {
  isFromTime: boolean;
  startTime: Watcher["startTime"];
};

export type ProgressPropsFromTime = ProgressProps & FromTime;

export interface Watcher {
  metaTime?: {
    resolveTime: number;
    rejectTime?: number;
  };
  startTime: number;
  resolveCondition: () => boolean;
  onResolve: () => any;
  onProgress?: (props: ProgressProps | ProgressPropsFromTime) => any;
  rejectCondition?: () => boolean;
  onReject?: () => any;
}

export class App extends PIXI.Application {
  currentScene: Scene = new Scene();
  /** ゲームが始まって何秒経ったか */
  time: number = 0;
  deltaTime: number = 0;
  frameCount: number = 0;
  /** ゲーム非同期監視リスト */
  #watchers: Set<Watcher> = new Set();

  key: Keyboard;

  constructor(
    initialScene: SceneData<any>,
    options: PIXI.IApplicationOptions & {}
  ) {
    const { ...rest } = options;
    super(rest);
    globalThis.$app = this;

    this.key = new Keyboard();

    this.gotoScene(initialScene);
    this.ticker.add((deltaTime) => {
      this.deltaTime = deltaTime;
      this.time += deltaTime / this.ticker.FPS;
      this.frameCount++;

      this.key._update();

      const updateProps: UpdateProps = { deltaTime, time: this.time };
      this.#watchers.forEach((watcher) => {
        if (!!watcher.resolveCondition()) {
          // 条件一致なら解決
          watcher.onResolve();
          this.#watchers.delete(watcher);
        } else if (!!watcher.rejectCondition?.()) {
          // エラー条件一致ならエラー
          watcher.onReject?.();
          this.#watchers.delete(watcher);
        }
        // onProgress 引数の設置画
        const { startTime } = watcher;
        watcher.onProgress?.({
          ...updateProps,
          isFromTime: !!watcher.metaTime,
          startTime,
          // addTimeWatcher から設定した場合
          ...(!!watcher.metaTime
            ? (() => {
                const { resolveTime, rejectTime } = watcher.metaTime;
                const per = (left: number, time: number) =>
                  1 + left / (startTime - time);
                const resolveLeft = resolveTime - this.time;
                return {
                  resolveTime,
                  resolvePer: per(resolveLeft, resolveTime),
                  resolveLeft,
                  ...(rejectTime !== undefined
                    ? (() => {
                        const rejectLeft = rejectTime - this.time;
                        return {
                          rejectTime,
                          rejectLeft,
                          rejectPer: per(rejectLeft, rejectTime),
                        };
                      })()
                    : {}),
                };
              })()
            : {}),
        });
      });
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
      this.loader.add(url, `./dist${url}`)
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
  /** Watcherを登録する */
  #registerWatcher(
    resolveCondition: Watcher["resolveCondition"],
    {
      onProgress,
      rejectCondition,
      errorMessage,
      metaTime,
    }: {
      onProgress?: Watcher["onProgress"];
      rejectCondition?: Watcher["rejectCondition"];
      errorMessage?: string;
      metaTime?: Watcher["metaTime"];
    }
  ) {
    return new Promise((resolve, reject) => {
      this.#watchers.add({
        startTime: $app.time,
        resolveCondition,
        onResolve: () => resolve(true),
        ...(onProgress ? { onProgress } : {}),
        ...(rejectCondition
          ? {
              rejectCondition,
              onReject: () => reject(new Error(errorMessage ?? "")),
            }
          : {}),
        ...(metaTime ? { metaTime } : {}),
      });
    });
  }
  /**
   * 特定条件まで待つ
   * @param resolveCondition 達成条件
   * @param onProgress 途中の毎フレーム処理
   * @param rejectCondition エラー条件
   * @param errorMessage エラーメッセージ
   */
  addWatcher(
    resolveCondition: Watcher["resolveCondition"],
    // 書きやすさのために null スキップ
    onProgress?: (props: ProgressProps) => any | null,
    rejectCondition?: Watcher["rejectCondition"] | null,
    errorMessage?: string | null
  ) {
    return this.#registerWatcher(resolveCondition, {
      onProgress: onProgress ?? undefined,
      rejectCondition: rejectCondition ?? undefined,
      errorMessage: errorMessage ?? undefined,
    });
  }
  /**
   * 特定の時間まで待つ
   * @param resolveTime 指定秒後に達成
   * @param onProgress 途中の毎フレーム処理
   * @param rejectTime 指定秒を超えたらエラー
   * @param errorMessage エラーメッセージ
   */
  addTimeWatcher(
    resolveTime: number,
    // 書きやすさのために null スキップ
    onProgress?: (props: ProgressPropsFromTime) => any | null,
    rejectTime?: number | null,
    errorMessage?: string | null
  ) {
    const now = $app.time;
    const metaTime: Watcher["metaTime"] = {
      resolveTime: now + resolveTime,
      rejectTime: rejectTime ? now + rejectTime : undefined,
    };
    return this.#registerWatcher(() => $app.time >= now + resolveTime, {
      onProgress: (onProgress as Watcher["onProgress"]) ?? undefined,
      rejectCondition: rejectTime
        ? () => $app.time >= now + rejectTime
        : undefined,
      errorMessage: errorMessage ?? undefined,
      metaTime,
    });
  }
  /** 次のフレームまで待つ */
  waitNextFrame() {
    return this.addTimeWatcher(0);
  }
}
