import { easing as tsEasing } from "ts-easing";
import { toGlobalForDebug } from "./helper";

const easing = {
  ...tsEasing,
  inElastic: (x: number) =>
    x === 0
      ? 0
      : x === 1
      ? 1
      : -(2 ** (10 * x - 10)) *
        Math.sin((x * 10 - 10.75) * ((2 * Math.PI) / 3)),
  outElastic: (x: number) =>
    x === 0
      ? 0
      : x === 1
      ? 1
      : 2 ** (-10 * x) * Math.sin((x * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1,
  inOutElastic: (x: number) => {
    const a = (2 * Math.PI) / 4.5;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(2 ** (20 * x - 10) * Math.sin((20 * x - 11.125) * a)) / 2
      : (2 ** (-20 * x + 10) * Math.sin((20 * x - 11.125) * a)) / 2 + 1;
  },
  inBack: (x: number) => {
    const a = 1.70158;
    const b = a + 1;
    return b * x * x * x - a * x * x;
  },
  outBack: (x: number) => {
    const a = 1.70158;
    const b = a + 1;
    return 1 + b * (x - 1) ** 3 + a * (x - 1) ** 2;
  },
  inOutBack: (x: number) => {
    const a = 1.70158;
    const b = a * 1.525;
    return x < 0.5
      ? ((2 * x) ** 2 * ((b + 1) * 2 * x - b)) / 2
      : ((2 * x - 2) ** 2 * ((b + 1) * (x * 2 - 2) + b) + 2) / 2;
  },
  inBounce(x: number) {
    return 1 - this.outBounce(1 - x);
  },
  outBounce: (x: number) => {
    const a = 7.5625;
    const b = 2.75;
    if (x < 1 / b) {
      return a * x * x;
    } else if (x < 2 / b) {
      return a * (x -= 1.5 / b) * x + 0.75;
    } else if (x < 2.5 / b) {
      return a * (x -= 2.25 / b) * x + 0.9375;
    } else {
      return a * (x -= 2.625 / b) * x + 0.984375;
    }
  },
  inOutBounce(x: number) {
    return x < 0.5
      ? (1 - this.outBounce(1 - 2 * x)) / 2
      : (1 + this.outBounce(2 * x - 1)) / 2;
  },
};

// function lerp(a, b, t) {
//   if (b == a) return a;
//   return a + t * (b - a);
// }

export const lerp = (
  ease: keyof typeof easing,
  a: number,
  b: number,
  t: number
) => {
  const f = easing[ease];
  const d = b - a;
  const x = t / d;
  const y = f(0 > x ? 0 : 1 < x ? 1 : x);
  const r = a + y * d;
  return r;
};
