import * as KeyCode from "keycode-js";

export type KeyboardCodeNames = Extract<
  keyof typeof KeyCode,
  `CODE_${string}`
> extends `CODE_${infer R}`
  ? R
  : never;

export type KeyboardCodeValues = typeof KeyCode[Extract<
  keyof typeof KeyCode,
  `CODE_${string}`
>];

/**
 * キーボード操作関連
 */
export class KeyboardManager {
  /** キーボードの状態
   * `{[code]: keepTime}` */
  #keyboardState: Map<KeyboardCodeValues, number> = new Map();
  constructor() {
    document.addEventListener("keydown", this.#onKeyboardDown.bind(this));
    document.addEventListener("keyup", this.#onKeyboardUp.bind(this));
    window.addEventListener("blur", this.#onKeyboardClear.bind(this));
  }
  _update() {
    this.#keyboardState.forEach((v, k) => {
      this.#keyboardState.set(k, v + 1);
    });
  }
  #onKeyboardDown(e: KeyboardEvent) {
    const code = e.code as KeyboardCodeValues;
    // 押しっぱなし対策
    if (this.#keyboardState.get(code) === undefined) {
      this.#keyboardState.set(code, 0);
    }
  }
  #onKeyboardUp(e: KeyboardEvent) {
    this.#keyboardState.delete(e.code as KeyboardCodeValues);
  }
  #onKeyboardClear() {
    this.#keyboardState.clear();
  }
  isPressed(code: KeyboardCodeNames) {
    return !!this.#keyboardState.get(KeyCode[`CODE_${code}`]);
  }
  isTriggered(code: KeyboardCodeNames) {
    return this.#keyboardState.get(KeyCode[`CODE_${code}`]) === 1;
  }
  isNotPressed(code: KeyboardCodeNames) {
    return !this.#keyboardState.get(KeyCode[`CODE_${code}`]);
  }
}
