import { EasingType, lerp } from "../../utils/math";
import { KeyboardCodeNames } from "../managers/KeyboardManager";
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
  static tween(
    {
      ease,
      time,
      from,
      to,
    }: {
      ease: EasingType;
      time: number;
      from: number;
      to: number;
    },
    fn: (now: number) => void
  ) {
    return Flow.time(time, ({ resolvePer }) => {
      fn(lerp(ease, from, to, resolvePer));
    });
  }
  static tween2D(
    {
      ease,
      time,
      from,
      to,
    }: {
      ease: EasingType | { x: EasingType; y: EasingType };
      time: number;
      from: { x: number; y: number };
      to: { x: number; y: number };
    },
    fn: (now: { x: number; y: number }) => void
  ) {
    let easeX: EasingType;
    let easeY: EasingType;
    if (typeof ease === "object") {
      [easeX, easeY] = [ease.x, ease.y];
    } else {
      [easeX, easeY] = [ease, ease];
    }
    return Flow.time(time, ({ resolvePer }) => {
      fn({
        x: lerp(easeX, from.x, to.x, resolvePer),
        y: lerp(easeY, from.y, to.y, resolvePer),
      });
    });
  }
  static parallel(promises: Promise<unknown>[]) {
    return Promise.all(promises);
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
        // クラッシュ対策
        if (prev === $app.frameCount) {
          await $app._watcher.waitNextFrame();
        }
      }
    })();
  }
  static use = {
    async moveLikeRPG(
      target: { x: number; y: number },
      time: number,
      range: number,
      {
        keys,
        ease,
      }: {
        keys?: {
          up: KeyboardCodeNames[];
          down: KeyboardCodeNames[];
          left: KeyboardCodeNames[];
          right: KeyboardCodeNames[];
        };
        ease?: EasingType;
      } = {}
    ) {
      const _keys = keys ?? {
        up: ["UP"],
        down: ["DOWN"],
        left: ["LEFT"],
        right: ["RIGHT"],
      };
      const _ease = ease ?? "linear";
      const { x, y } = target;
      const pressed = (names: KeyboardCodeNames[]) =>
        names.find((k) => $app.getKey(k).isPressed);
      if (pressed(_keys.left)) {
        await Flow.tween(
          {
            ease: _ease,
            time,
            from: x,
            to: x - range,
          },
          (n) => {
            target.x = n;
          }
        );
      } else if (pressed(_keys.right)) {
        await Flow.tween(
          {
            ease: _ease,
            time,
            from: x,
            to: x + range,
          },
          (n) => {
            target.x = n;
          }
        );
      } else if (pressed(_keys.up)) {
        await Flow.tween(
          {
            ease: _ease,
            time,
            from: y,
            to: y - range,
          },
          (n) => {
            target.y = n;
          }
        );
      } else if (pressed(_keys.down)) {
        await Flow.tween(
          {
            ease: _ease,
            time,
            from: y,
            to: y + range,
          },
          (n) => {
            target.y = n;
          }
        );
      }
    },
  };
}
