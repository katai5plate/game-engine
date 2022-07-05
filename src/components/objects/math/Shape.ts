import Rect from "./Rect";
import XY from "./XY";

export class Circle extends Rect {
  constructor(rect: Rect);
  constructor(xy: XY, r: number);
  constructor(...value: (XY | Rect | number)[]) {
    if (value.length === 0) {
      const rect = value[0] as Rect;
      super(rect.x, rect.y, rect.width, rect.height);
    } else {
      const xy = value[0] as XY;
      const r = value[1] as number;
      super(xy.x, xy.y, r, r);
    }
    (this._shapeName as string) = "Circle";
  }
  isEllipse() {
    return this.width !== this.height;
  }
  getRadius() {
    return new XY(this.width, this.height);
  }
}

export class Line {
  _shapeName = "Line";
  a: XY;
  b: XY;
  constructor(a: XY, b: XY) {
    this.a = a;
    this.b = b;
  }
  add(value: number): this;
  add(x: number, y: number): this;
  add(...args: number[]) {
    const { a, b } = this;
    if (args.length === 1) {
      const [v] = args;
      [a, b].forEach((l) => l.add(v));
    } else {
      const [x, y] = args;
      [a, b].forEach((l) => l.add(x, y));
    }
    return this;
  }
  sub(value: number): this;
  sub(x: number, y: number): this;
  sub(...args: number[]) {
    const { a, b } = this;
    if (args.length === 1) {
      const [v] = args;
      [a, b].forEach((l) => l.sub(v));
    } else {
      const [x, y] = args;
      [a, b].forEach((l) => l.sub(x, y));
    }
    return this;
  }
  mul(value: number): this;
  mul(x: number, y: number): this;
  mul(...args: number[]) {
    const { a, b } = this;
    if (args.length === 1) {
      const [v] = args;
      [a, b].forEach((l) => l.mul(v));
    } else {
      const [x, y] = args;
      [a, b].forEach((l) => l.mul(x, y));
    }
    return this;
  }
  div(value: number): this;
  div(x: number, y: number): this;
  div(...args: number[]) {
    const { a, b } = this;
    if (args.length === 1) {
      const [v] = args;
      [a, b].forEach((l) => l.div(v));
    } else {
      const [x, y] = args;
      [a, b].forEach((l) => l.div(x, y));
    }
    return this;
  }
  mod(value: number): this;
  mod(x: number, y: number): this;
  mod(...args: number[]) {
    const { a, b } = this;
    if (args.length === 1) {
      const [v] = args;
      [a, b].forEach((l) => l.mod(v));
    } else {
      const [x, y] = args;
      [a, b].forEach((l) => l.mod(x, y));
    }
    return this;
  }
  toArray(): [number, number, number, number] {
    return [this.a.x, this.a.y, this.b.x, this.b.y];
  }
}

export class Polygon {
  _shapeName = "Polygon";
  points: XY[];
  constructor(points: XY[]) {
    this.points = points;
  }
  add(value: number): this;
  add(x: number, y: number): this;
  add(...args: number[]) {
    if (args.length === 1) {
      const [v] = args;
      this.points.forEach((p) => p.add(v));
    } else {
      const [x, y] = args;
      this.points.forEach((p) => p.add(x, y));
    }
    return this;
  }
  sub(value: number): this;
  sub(x: number, y: number): this;
  sub(...args: number[]) {
    if (args.length === 1) {
      const [v] = args;
      this.points.forEach((p) => p.sub(v));
    } else {
      const [x, y] = args;
      this.points.forEach((p) => p.sub(x, y));
    }
    return this;
  }
  mul(value: number): this;
  mul(x: number, y: number): this;
  mul(...args: number[]) {
    if (args.length === 1) {
      const [v] = args;
      this.points.forEach((p) => p.mul(v));
    } else {
      const [x, y] = args;
      this.points.forEach((p) => p.mul(x, y));
    }
    return this;
  }
  div(value: number): this;
  div(x: number, y: number): this;
  div(...args: number[]) {
    if (args.length === 1) {
      const [v] = args;
      this.points.forEach((p) => p.div(v));
    } else {
      const [x, y] = args;
      this.points.forEach((p) => p.div(x, y));
    }
    return this;
  }
  mod(value: number): this;
  mod(x: number, y: number): this;
  mod(...args: number[]) {
    if (args.length === 1) {
      const [v] = args;
      this.points.forEach((p) => p.mod(v));
    } else {
      const [x, y] = args;
      this.points.forEach((p) => p.mod(x, y));
    }
    return this;
  }
  getPoints() {
    return this.points;
  }
  toArray() {
    return this.points.reduce((p, c) => [...p, c.x, c.y], [] as number[]);
  }
}
