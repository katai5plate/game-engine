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
      while (1) {
        const prev = $app.frameCount;
        if ((await fn(loopEnd)) === loopEnd) break;
        if (prev === $app.frameCount) {
          await $app._watcher.waitNextFrame();
        }
      }
    })();
  }
}
