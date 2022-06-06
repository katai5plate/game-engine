export enum TouchState {
  normal,
  over,
  press,
  unknown,
}

/**
 * ボタンなどタッチ可能なオブジェクトのための制御
 */
export class Touch {
  #isDown: boolean = false;
  #isOver: boolean = false;
  #state: TouchState = TouchState.normal;
  #callbacks: {
    onClick?: () => void;
    onRelease?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onNormal?: () => void;
    onOver?: () => void;
    onPress?: () => void;
    onUnknown?: () => void;
  } = {};

  /**
   * 押下判定と当たり判定を設定するハンドラーを取得する
   * ```ts
   * const touch = new Touch();
   * const {
   *   onDown, // 押している状態
   *   onUp, // 押していない状態
   *   onOver, // 当たり判定内
   *   onOut // 当たり判定外
   * } = touch.createInput();
   * this.on("touchstart", onDown)
   * // :
   * ```
   */
  createInput() {
    return {
      onDown: () => this.#onDown(),
      onUp: () => this.#onUp(),
      onOver: () => this.#onOver(),
      onOut: () => this.#onOut(),
    };
  }
  /**
   * 各判定時に実行するコールバック関数を設定する
   * @param callbacks
   * ```ts
   * const touch = new Touch();
   * touch.connectOutput({
   *   // クリックしたとき
   *   onClick: this.onClick.bind(this),
   *   // 押し終えたとき
   *   onRelease: this.onRelease.bind(this),
   *   // 当たり判定内に入った時
   *   onFocus: this.onFocus.bind(this),
   *   // 当たり判定外に出た時
   *   onBlur: this.onBlur.bind(this),
   *   // 通常状態になった時
   *   onNormal: this.onNormal.bind(this),
   *   // マウスオーバー状態になった時
   *   onOver: this.onOver.bind(this),
   *   // 押している状態になった時
   *   onPress: this.onPress.bind(this),
   *   // 当たり判定外なのに押下状態になっている時
   *   onUnknown: this.onUnknown.bind(this),
   * });
   * ```
   */
  connectOutput(callbacks: {
    onClick?: () => void;
    onRelease?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onNormal?: () => void;
    onOver?: () => void;
    onPress?: () => void;
    onUnknown?: () => void;
  }) {
    this.#callbacks = callbacks;
  }

  #event() {
    if (this.#isDown) {
      if (this.#isOver) {
        this.#onDownOver();
      } else {
        this.#onDownOut();
      }
    } else {
      if (this.#isOver) {
        this.#onUpOver();
      } else {
        this.#onUpOut();
      }
    }
  }
  #onDownOver() {
    if (this.#state === TouchState.normal) {
      this.#callbacks.onFocus?.();
      this.#state = TouchState.over;
    }
    if (this.#state === TouchState.over) {
      this.#callbacks.onClick?.();
    }
    this.#state = TouchState.press;
    this.#callbacks.onPress?.();
  }
  #onDownOut() {
    if (this.#state !== TouchState.unknown) {
      // console.warn("ポインタが画面外なのに押下状態になっています");
    }
    this.#callbacks.onUnknown?.();
    this.#state = TouchState.unknown;
  }
  #onUpOver() {
    if (this.#state === TouchState.normal) {
      this.#callbacks.onFocus?.();
    }
    if (this.#state === TouchState.press) {
      this.#callbacks.onRelease?.();
    }
    this.#callbacks.onOver?.();
    this.#state = TouchState.over;
  }
  #onUpOut() {
    if (this.#state === TouchState.press) {
      this.#callbacks.onRelease?.();
      this.#state = TouchState.over;
    }
    if (this.#state === TouchState.over) {
      this.#callbacks.onBlur?.();
    }
    this.#state = TouchState.normal;
    this.#callbacks.onNormal?.();
  }
  #onDown() {
    if (this.#isDown === false) {
      this.#isDown = true;
      this.#event();
    }
  }
  #onUp() {
    if (this.#isDown === true) {
      this.#isDown = false;
      this.#event();
    }
  }
  #onOver() {
    if (this.#isOver === false) {
      this.#isOver = true;
      this.#event();
    }
  }
  #onOut() {
    if (this.#isOver === true) {
      this.#isOver = false;
      this.#event();
    }
  }
}
