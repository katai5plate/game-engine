import { App } from "./app";

declare global {
  // enzine
  var $app: App;
  var $isTest: boolean;

  // zzfx
  var zzfxP: (...args: any[]) => AudioBufferSourceNode;
  var zzfxG: (
    q?: number,
    k?: number,
    c?: number,
    e?: number,
    t?: number,
    u?: number,
    r?: number,
    F?: number,
    v?: number,
    z?: number,
    w?: number,
    A?: number,
    l?: number,
    B?: number,
    x?: number,
    G?: number,
    d?: number,
    y?: number,
    m?: number,
    C?: number
  ) => number[][];
  var zzfxV: number;
  var zzfxR: number;
  var zzfxX: AudioContext;
  var zzfxM: (
    instruments: (number | void)[][],
    patterns: (number | void)[][][],
    sequence: number[],
    BPM?: number,
    meta?: {
      title?: string;
      author?: string;
      authorUrl?: string;
      license?: string;
      instruments?: string[];
      patterns?: string[];
    }
  ) => number[][];
}
