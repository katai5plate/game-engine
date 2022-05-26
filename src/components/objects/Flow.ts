import { ProgressProps, ProgressPropsFromTime } from "../../app";

type ResolveCondition = Parameters<typeof $app.addWatcher>[0];
type ResolveTime = Parameters<typeof $app.addTimeWatcher>[0];

export class Flow<T> {
  constructor(target: T, fn: (start: Promise<void>, $: T) => Promise<void>) {
    // this.target = target;
    fn(Promise.resolve(), target);
  }
  static LOOPBACK = Symbol("LOOPBACK");
  static time(
    resolveTime: ResolveTime,
    onProgress?: (props: ProgressPropsFromTime) => void
  ) {
    return () => $app.addTimeWatcher(resolveTime, onProgress);
  }
  static when(
    resolveCondition: ResolveCondition,
    onProgress?: (props: ProgressProps) => void
  ) {
    return () => $app.addWatcher(resolveCondition, onProgress);
  }
  static loop(
    fn: (head: Promise<void>) => Promise<void | typeof this.LOOPBACK>
  ) {
    return async () => {
      while (1) {
        if ((await fn(Promise.resolve())) !== this.LOOPBACK) break;
      }
    };
  }
  static loopBack() {
    return () => this.LOOPBACK;
  }
}
