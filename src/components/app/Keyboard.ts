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

export class Keyboard {
  /** キーボードの状態
   * `{[code]: this.time}` */
  #keyboardState: Map<KeyboardCodeValues, number> = new Map();
  constructor() {
    document.addEventListener("keydown", this.#onKeyboardDown.bind(this));
    document.addEventListener("keyup", this.#onKeyboardUp.bind(this));
    window.addEventListener("blur", this.#onKeyboardClear.bind(this));
  }
  #onKeyboardDown(e: KeyboardEvent) {
    this.#keyboardState.set(e.code as KeyboardCodeValues, $app.time);
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
    return this.#keyboardState.get(KeyCode[`CODE_${code}`]) === $app.time;
  }
  isNotPressed(code: KeyboardCodeNames) {
    return !this.#keyboardState.get(KeyCode[`CODE_${code}`]);
  }
}
