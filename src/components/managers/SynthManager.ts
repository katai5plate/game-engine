export type SynthSeData = [
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
];
export type SynthBgmData = [
  instruments: (number | void)[][],
  patterns: (number | void)[][][],
  sequence: number[],
  BPM?: number | undefined,
  meta?:
    | {
        title?: string | undefined;
        author?: string | undefined;
        authorUrl?: string | undefined;
        license?: string | undefined;
        instruments?: string[] | undefined;
        patterns?: string[] | undefined;
      }
    | undefined
];

/**
 * ZzFX系
 */
export class SynthManager {
  bgmBuffer?: number[][];
  seBuffer?: number[][];
  bgmGainNode?: GainNode;
  seGainNode?: GainNode;
  bgmVolume: number = 0;
  seVolume: number = 0;
  bgmNode?: AudioBufferSourceNode;
  seNode?: AudioBufferSourceNode;
  preloadedBgmBuffers: Map<string, number[][]> = new Map();
  /** スマホで音が鳴らない対策 */
  emptyBuffer?: AudioBufferSourceNode;
  constructor() {
    this.seGainNode = this.#getContext().createGain();
    this.seGainNode.connect(this.#getContext().destination);
    this.bgmGainNode = this.#getContext().createGain();
    this.bgmGainNode.connect(this.#getContext().destination);
    this.setBgmVolume(0.5);
    this.setSeVolume(1);
    this.#initContext();
  }
  #initContext() {
    this.emptyBuffer = this.#getContext().createBufferSource();
    document.addEventListener("touchstart", () => {
      try {
        if (this.emptyBuffer) {
          this.emptyBuffer.start();
          this.emptyBuffer.stop();
        }
      } catch (error) {}
    });
    document.addEventListener(
      typeof document.ontouchend !== "undefined" ? "touchend" : "mouseup",
      () => {
        this.#getContext().resume();
      }
    );
  }
  #getContext() {
    return window.zzfxX;
  }
  #updateGain() {
    if (!(this.bgmGainNode && this.seGainNode)) return;
    // 元の音量値が 0 のため、-1 が消音値
    this.bgmGainNode.gain.value = -1 + this.bgmVolume * 2;
    this.seGainNode.gain.value = -1 + this.seVolume * 2;
  }
  setVolume(bgmVolume?: number, seVolume?: number) {
    bgmVolume && this.setBgmVolume(bgmVolume);
    seVolume && this.setSeVolume(seVolume);
  }
  setBgmVolume(volume: number) {
    this.bgmVolume = volume;
    this.#updateGain();
  }
  setSeVolume(volume: number) {
    this.seVolume = volume;
    this.#updateGain();
  }
  preloadBgm(alias: string, bgmData: SynthBgmData) {
    this.preloadedBgmBuffers.set(alias, window.zzfxM(...bgmData));
  }
  playPreloadedBgm(alias: string, isLoop: boolean) {
    if (this.bgmBuffer) this.stopBgm();
    this.bgmBuffer = this.preloadedBgmBuffers.get(alias);
    if (this.bgmBuffer) {
      this.bgmNode = window.zzfxP(...this.bgmBuffer);
      this.bgmNode.loop = !!isLoop;
      this.bgmGainNode && this.bgmNode.connect(this.bgmGainNode);
    }
  }
  playBgm(bgmData: SynthBgmData, isLoop: boolean) {
    if (this.bgmBuffer) this.stopBgm();
    this.bgmBuffer = window.zzfxM(...bgmData);
    this.bgmNode = window.zzfxP(...this.bgmBuffer);
    this.bgmNode.loop = !!isLoop;
    this.bgmGainNode && this.bgmNode.connect(this.bgmGainNode);
  }
  playSe(seData: SynthSeData) {
    if (seData === null) return;
    this.seBuffer = window.zzfxG(...seData);
    this.seNode = window.zzfxP(this.seBuffer);
    this.seGainNode && this.seNode.connect(this.seGainNode);
  }
  stopBgm() {
    this.bgmNode?.stop();
    this.bgmBuffer = undefined;
  }
  stopSe() {
    this.seNode?.stop();
    this.seBuffer = undefined;
  }
}
