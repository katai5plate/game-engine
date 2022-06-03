import {
  ProgressProps,
  ProgressPropsFromTime,
  WatchManager,
} from "../managers/WatcherManager";

type ResolveCondition = Parameters<typeof WatchManager.prototype.waitOn>[0];
type ResolveTime = Parameters<typeof WatchManager.prototype.waitTime>[0];

export class Flow<T> {
  constructor(target: T, fn: ($: T) => Promise<void>) {
    fn(target);
  }
  static LOOPBACK = Symbol("LOOPBACK");
  static time(
    resolveTime: ResolveTime,
    onProgress?: (props: ProgressPropsFromTime) => void
  ) {
    return $app._watcher.waitTime(resolveTime, onProgress);
  }
  static when(
    resolveCondition: ResolveCondition,
    onProgress?: (props: ProgressProps) => void
  ) {
    return $app._watcher.waitOn(resolveCondition, onProgress);
  }
  static async loop(fn: <T extends Symbol>(end: T) => Promise<void | T>) {
    const loopEnd = Symbol("LOOP_END");
    await (async () => {
      // const prev = $app.time;
      while (1) {
        if ((await fn(loopEnd)) === loopEnd) break;
        await $app._watcher.waitNextFrame();
        // if (prev === $app.time) {
        //   throw new Error("無限ループによるフリーズを回避しました");
        // }
      }
    })();
  }
}
