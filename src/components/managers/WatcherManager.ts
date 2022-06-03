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

export class WatchManager {
  /** ゲーム非同期監視リスト */
  #watchers: Set<Watcher> = new Set();
  constructor() {}
  get size() {
    return this.#watchers.size;
  }
  _update(deltaTime: number) {
    const updateProps: UpdateProps = { deltaTime, time: $app.time };
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
              const resolveLeft = resolveTime - $app.time;
              return {
                resolveTime,
                resolvePer: per(resolveLeft, resolveTime),
                resolveLeft,
                ...(rejectTime !== undefined
                  ? (() => {
                      const rejectLeft = rejectTime - $app.time;
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
  waitOn(
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
  waitTime(
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
    return this.waitTime(0);
  }
}
