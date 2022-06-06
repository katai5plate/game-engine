/**
 * 画面のリサイズ関連
 */
export class ResizeManager {
  prevScrollWidth: number = NaN;
  prevScrollHeight: number = NaN;
  constructor() {
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("focus", this.resize.bind(this));
    window.addEventListener("blur", this.resize.bind(this));
    window.addEventListener("scroll", this.resize.bind(this));
    // scrollWidth|Height が変更されたらリサイズ
    $app._watcher
      .waitOn(() => {
        const { scrollWidth, scrollHeight } = $app.view;
        if (
          this.prevScrollWidth !== scrollWidth ||
          this.prevScrollHeight !== scrollHeight
        ) {
          this.prevScrollWidth = scrollWidth;
          this.prevScrollHeight = scrollHeight;
          return true;
        }
        return false;
      })
      .then(this.resize.bind(this));
    this.resize();
  }
  /** リサイズ時に自動的に黒枠を再調整する */
  #onResize() {
    const { width, height } = $app.renderer;
    const { innerWidth, innerHeight } = window;
    const { scrollWidth, scrollHeight } = $app.view;
    // 横長
    if (width > height) {
      if (innerWidth > scrollWidth) {
        $app.view.style.width = "auto";
        $app.view.style.height = "100%";
      } else {
        $app.view.style.width = "100%";
        $app.view.style.height = "auto";
      }
      return;
    }
    // 縦長
    if (width < height) {
      if (innerHeight > scrollHeight && scrollHeight !== 0) {
        $app.view.style.width = "100%";
        $app.view.style.height = "auto";
      } else {
        $app.view.style.width = "auto";
        $app.view.style.height = "100%";
      }
      return;
    }
    // 一致
    if (innerWidth < innerHeight) {
      $app.view.style.width = "100%";
      $app.view.style.height = "auto";
    } else {
      $app.view.style.width = "auto";
      $app.view.style.height = "100%";
    }
    return;
  }
  resize() {
    this.#onResize();
  }
}
