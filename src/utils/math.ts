import { easing as tsEasing } from "ts-easing";
import * as col from "intersects";
import { Rect, Shape, Shapes, XY } from "../components/objects/math";

const easing = {
  ...tsEasing,
  inElastic(x: number) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -(2 ** (10 * x - 10)) *
        Math.sin((x * 10 - 10.75) * ((2 * Math.PI) / 3));
  },
  outElastic(x: number) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : 2 ** (-10 * x) * Math.sin((x * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
  },
  inOutElastic(x: number) {
    const a = (2 * Math.PI) / 4.5;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(2 ** (20 * x - 10) * Math.sin((20 * x - 11.125) * a)) / 2
      : (2 ** (-20 * x + 10) * Math.sin((20 * x - 11.125) * a)) / 2 + 1;
  },
  inBack(x: number) {
    const a = 1.70158;
    const b = a + 1;
    return b * x * x * x - a * x * x;
  },
  outBack(x: number) {
    const a = 1.70158;
    const b = a + 1;
    return 1 + b * (x - 1) ** 3 + a * (x - 1) ** 2;
  },
  inOutBack(x: number) {
    const a = 1.70158;
    const b = a * 1.525;
    return x < 0.5
      ? ((2 * x) ** 2 * ((b + 1) * 2 * x - b)) / 2
      : ((2 * x - 2) ** 2 * ((b + 1) * (x * 2 - 2) + b) + 2) / 2;
  },
  inBounce(x: number) {
    return 1 - easing.outBounce(1 - x);
  },
  outBounce(x: number) {
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
      ? (1 - easing.outBounce(1 - 2 * x)) / 2
      : (1 + easing.outBounce(2 * x - 1)) / 2;
  },
};

export type EasingType = keyof typeof easing;

export const lerp = (ease: EasingType, a: number, b: number, x: number) => {
  const f = easing[ease];
  const d = b - a;
  const t = f(0 > x ? 0 : 1 < x ? 1 : x);
  const r = a + t * d;
  return r;
};

export const hit = (a: Shapes, b: Shapes, tolerance: number = 1) => {
  if (a instanceof Rect) {
    const p = a.toArray();
    if (b._shapeName === "Rect")
      return col.boxBox(...p, ...(b as Rect).toArray());
    if (b._shapeName === "Circle")
      return col.boxEllipse(...p, ...(b as Shape.Circle).toArray());
    if (b._shapeName === "Line")
      return col.boxLine(...p, ...(b as Shape.Line).toArray());
    if (b._shapeName === "XY")
      return col.boxPoint(...p, ...(b as XY).toArray());
    if (b._shapeName === "Polygon")
      return col.boxPolygon(...p, (b as Shape.Polygon).toArray());
  }
  if (a instanceof Shape.Circle) {
    const p = a.toArray();
    if (b._shapeName === "Rect")
      return col.ellipseBox(...p, ...(b as Rect).toArray());
    if (b._shapeName === "Circle")
      return col.ellipseEllipse(...p, ...(b as Shape.Circle).toArray());
    if (b._shapeName === "Line")
      return col.ellipseLine(...p, ...(b as Shape.Line).toArray());
    if (b._shapeName === "XY")
      return col.ellipsePoint(...p, ...(b as XY).toArray());
    if (b._shapeName === "Polygon")
      return col.ellipsePolygon(...p, (b as Shape.Polygon).toArray());
  }
  if (a instanceof Shape.Line) {
    const p = a.toArray();
    if (b._shapeName === "Rect")
      return col.lineBox(...p, ...(b as Rect).toArray());
    if (b._shapeName === "Circle")
      return col.lineEllipse(...p, ...(b as Shape.Circle).toArray());
    if (b._shapeName === "Line")
      return col.lineLine(...p, ...(b as Shape.Line).toArray());
    if (b._shapeName === "XY")
      return col.linePoint(...p, ...(b as XY).toArray(), tolerance);
    if (b._shapeName === "Polygon")
      col.linePolygon(...p, b.toArray(), tolerance);
  }
  if (a instanceof XY) {
    const p = a.toArray();
    if (b._shapeName === "Rect")
      return col.pointBox(...p, ...(b as Rect).toArray());
    if (b._shapeName === "Circle")
      return col.pointEllipse(...p, ...(b as Shape.Circle).toArray());
    if (b._shapeName === "Line")
      return col.pointLine(...p, ...(b as Shape.Line).toArray());
    if (b._shapeName === "XY")
      col.circleCircle(...p, tolerance, ...(b as XY).toArray(), tolerance);
    if (b._shapeName === "Polygon")
      col.pointPolygon(...p, (b as Shape.Polygon).toArray(), tolerance);
  }
  if (a instanceof Shape.Polygon) {
    const p = a.toArray();
    if (b._shapeName === "Rect")
      return col.polygonBox(p, ...(b as Rect).toArray());
    if (b._shapeName === "Circle")
      return col.polygonEllipse(p, ...(b as Shape.Circle).toArray());
    if (b._shapeName === "Line")
      return col.polygonLine(p, ...(b as Shape.Line).toArray(), tolerance);
    if (b._shapeName === "XY")
      return col.polygonPoint(p, ...(b as XY).toArray(), tolerance);
    if (b._shapeName === "Polygon")
      return col.polygonPolygon(p, (b as Shape.Polygon).toArray());
  }
  throw new Error("存在しない Shape です");
};
