type MouseValues =
  | "LEFT_DOWN"
  | "CENTER_DOWN"
  | "RIGHT_DOWN"
  | "CLICK"
  | "DOUBLE_CLICK"
  | "RIGHT_CLICK"
  | "WHEEL_DOWN"
  | "WHEEL_UP";

/**
 * マウス操作関連
 */
export class MouseManager {
  #mouseState: Map<MouseValues, number> = new Map();
  constructor() {
    document.addEventListener("mousedown", this.#onMouseDown.bind(this));
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
    document.addEventListener("mouseleave", this.#onMouseUp.bind(this));
    document.addEventListener("mouseout", this.#onMouseUp.bind(this));
    document.addEventListener("click", this.#onMouseClick.bind(this));
    document.addEventListener(
      "contextmenu",
      this.#onMouseRightClick.bind(this)
    );
    document.addEventListener("wheel", this.#onMouseWheel.bind(this));
  }
  _update() {
    this.#mouseState.forEach((v, k) => {
      this.#mouseState.set(k, v + 1);
    });
    this.#cleanState();
  }
  #cleanState() {
    if (Number(this.#mouseState.get("WHEEL_DOWN")) > 1) {
      this.#mouseState.delete("WHEEL_DOWN" as MouseValues);
    }
    if (Number(this.#mouseState.get("WHEEL_UP")) > 1) {
      this.#mouseState.delete("WHEEL_UP" as MouseValues);
    }
  }
  #onMouseDown(e: MouseEvent) {
    if (e.button === 0) {
      if (this.#mouseState.get("LEFT_DOWN") === undefined) {
        this.#mouseState.set("LEFT_DOWN", 0);
      }
    } else if (e.button === 1) {
      if (this.#mouseState.get("CENTER_DOWN") === undefined) {
        this.#mouseState.set("CENTER_DOWN", 0);
      }
    } else if (e.button === 2) {
      if (this.#mouseState.get("RIGHT_DOWN") === undefined) {
        this.#mouseState.set("RIGHT_DOWN", 0);
      }
    }
  }
  #onMouseUp(e: MouseEvent) {
    if (e.button === 0) {
      this.#mouseState.delete("LEFT_DOWN" as MouseValues);
    } else if (e.button === 1) {
      this.#mouseState.delete("CENTER_DOWN" as MouseValues);
    } else if (e.button === 2) {
      this.#mouseState.delete("RIGHT_DOWN" as MouseValues);
    }
    this.#mouseState.delete("CLICK" as MouseValues);
    this.#mouseState.delete("DOUBLE_CLICK" as MouseValues);
    this.#mouseState.delete("RIGHT_CLICK" as MouseValues);
  }
  #onMouseClick() {
    if (this.#mouseState.get("CLICK") === undefined) {
      this.#mouseState.set("CLICK", 0);
    }
  }
  #onMouseRightClick(e: MouseEvent) {
    e.preventDefault();
  }
  #onMouseWheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      if (this.#mouseState.get("WHEEL_DOWN") === undefined) {
        this.#mouseState.set("WHEEL_DOWN", 0);
      }
    } else {
      if (this.#mouseState.get("WHEEL_UP") === undefined) {
        this.#mouseState.set("WHEEL_UP", 0);
      }
    }
  }
  isWheelDown() {
    return this.#mouseState.get("WHEEL_DOWN") === 1;
  }
  isWheelUp() {
    return this.#mouseState.get("WHEEL_UP") === 1;
  }
  isClicked(button: "LEFT" | "CENTER" | "RIGHT" = "LEFT") {
    return this.#mouseState.get(`${button}_DOWN`) === 1;
  }
  isPressed(button: "LEFT" | "CENTER" | "RIGHT" = "LEFT") {
    return !!this.#mouseState.get(`${button}_DOWN`);
  }
  isNotPressed(button: "LEFT" | "CENTER" | "RIGHT" = "LEFT") {
    return !this.#mouseState.get(`${button}_DOWN`);
  }
  getPosition() {
    return $app._touch.getPosition();
  }
}
