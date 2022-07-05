import * as PIXI from "pixi.js";
// import * as col from "inspector";

export class XY extends PIXI.Point {
  constructor(x: number = 0, y: number = 0) {
    super(x, y);
  }
  static from(p: { [k: string]: any; x: number; y: number }) {
    return new this(p.x, p.y);
  }
  add(value: number): this;
  add(x: number, y: number): this;
  add(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x + a, this.y + a);
    }
    const [x, y] = args;
    return this.set(this.x + x, this.y + y);
  }
  sub(value: number): this;
  sub(x: number, y: number): this;
  sub(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x - a, this.y - a);
    }
    const [x, y] = args;
    return this.set(this.x - x, this.y - y);
  }
  mul(value: number): this;
  mul(x: number, y: number): this;
  mul(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x * a, this.y * a);
    }
    const [x, y] = args;
    return this.set(this.x * x, this.y * y);
  }
  div(value: number): this;
  div(x: number, y: number): this;
  div(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x / a, this.y / a);
    }
    const [x, y] = args;
    return this.set(this.x / x, this.y / y);
  }
  mod(value: number): this;
  mod(x: number, y: number): this;
  mod(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x % a, this.y % a);
    }
    const [x, y] = args;
    return this.set(this.x % x, this.y % y);
  }
}

export class Rect extends PIXI.Rectangle {
  constructor(x: number = 0, y: number = 0, w: number = 1, h: number = 1) {
    super(x, y, w, h);
  }
  static from(p: {
    [k: string]: any;
    x: number;
    y: number;
    w?: number;
    h?: number;
    width?: number;
    height?: number;
  }) {
    return new this(p.x, p.y, p.width ?? p.w ?? 1, p.height ?? p.h ?? 1);
  }
  static fromXY2(xy: XY, wh: XY) {
    return new this(xy.x, xy.y, wh.x, wh.y);
  }
  set(x: number = 0, y: number = 0, w: number = 1, h: number = 1) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    return this;
  }
  add(value: number): this;
  add(x: number, y: number, w: number, h: number): this;
  add(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x + a, this.y + a, this.width + a, this.height + a);
    }
    const [x, y, w, h] = args;
    return this.set(this.x + x, this.y + y, this.width + w, this.height + h);
  }
  sub(value: number): this;
  sub(x: number, y: number, w: number, h: number): this;
  sub(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x - a, this.y - a, this.width - a, this.height - a);
    }
    const [x, y, w, h] = args;
    return this.set(this.x - x, this.y - y, this.width - w, this.height - h);
  }
  mul(value: number): this;
  mul(x: number, y: number, w: number, h: number): this;
  mul(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x * a, this.y * a, this.width * a, this.height * a);
    }
    const [x, y, w, h] = args;
    return this.set(this.x * x, this.y * y, this.width * w, this.height * h);
  }
  div(value: number): this;
  div(x: number, y: number, w: number, h: number): this;
  div(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x / a, this.y / a, this.width / a, this.height / a);
    }
    const [x, y, w, h] = args;
    return this.set(this.x / x, this.y / y, this.width / w, this.height / h);
  }
  mod(value: number): this;
  mod(x: number, y: number, w: number, h: number): this;
  mod(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x % a, this.y % a, this.width % a, this.height % a);
    }
    const [x, y, w, h] = args;
    return this.set(this.x % x, this.y % y, this.width % w, this.height % h);
  }
  addWH(value: number): this;
  addWH(w: number, h: number): this;
  addWH(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width + a, this.height + a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width + w, this.height + h);
  }
  subWH(value: number): this;
  subWH(w: number, h: number): this;
  subWH(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width - a, this.height - a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width - w, this.height - h);
  }
  mulWH(value: number): this;
  mulWH(w: number, h: number): this;
  mulWH(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width * a, this.height * a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width * w, this.height * h);
  }
  divWH(value: number): this;
  divWH(w: number, h: number): this;
  divWH(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width / a, this.height / a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width / w, this.height / h);
  }
  modWH(value: number): this;
  modWH(w: number, h: number): this;
  modWH(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width % a, this.height % a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width % w, this.height % h);
  }
}
