import * as PIXI from "pixi.js";
import XY from "./XY";

export default class Rect extends PIXI.Rectangle {
  readonly _shapeName: "Rect" | "Circle" = "Rect";
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
  addScale(value: number): this;
  addScale(w: number, h: number): this;
  addScale(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width + a, this.height + a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width + w, this.height + h);
  }
  subScale(value: number): this;
  subScale(w: number, h: number): this;
  subScale(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width - a, this.height - a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width - w, this.height - h);
  }
  mulScale(value: number): this;
  mulScale(w: number, h: number): this;
  mulScale(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width * a, this.height * a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width * w, this.height * h);
  }
  divScale(value: number): this;
  divScale(w: number, h: number): this;
  divScale(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width / a, this.height / a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width / w, this.height / h);
  }
  modScale(value: number): this;
  modScale(w: number, h: number): this;
  modScale(...args: number[]) {
    if (args.length === 1) {
      const [a] = args;
      return this.set(this.x, this.y, this.width % a, this.height % a);
    }
    const [w, h] = args;
    return this.set(this.x, this.y, this.width % w, this.height % h);
  }
  toArray(): [number, number, number, number] {
    return [this.x, this.y, this.width, this.height];
  }
}
