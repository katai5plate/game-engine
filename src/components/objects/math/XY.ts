import * as PIXI from "pixi.js";

export default class XY extends PIXI.Point {
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
