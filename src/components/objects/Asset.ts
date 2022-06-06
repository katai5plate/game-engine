import * as PIXI from "pixi.js";

export type AssetType = "image" | "sound" | "midi" | "text";

/**
 * 素材管理
 */
export class Asset {
  #resource: PIXI.LoaderResource;
  constructor(preloadedAssset: string) {
    this.#resource = $app.loader.resources[preloadedAssset];
  }
  #extToAssetType(ext: string) {
    if (["png", "bmp", "jpg", "jpeg", "svg"].includes(ext)) {
      return "image";
    }
    if (["wav", "ogg", "mp4", "m4a"].includes(ext)) {
      return "sound";
    }
    if (ext === "mid") {
      return "midi";
    }
    if (["txt", "csv"].includes(ext)) {
      return "text";
    }
    throw new Error(`対応していないフォーマットです: ${ext}`);
  }
  #checkDataExt(type: AssetType) {
    const { url } = this.#resource;
    const ext = url.match(/\.([a-zA-Z0-9]+)$/)?.[1];
    if (!ext) throw new Error(`拡張子のないファイルが読み込まれました: ${url}`);
    if (type === this.#extToAssetType(ext)) return;
    throw new Error("素材フォーマットに対応していない機能は使用できません");
  }
  toLoaderResource() {
    return this.#resource;
  }
  toTexture() {
    this.#checkDataExt("image");
    return this.#resource.texture!;
  }
  toSprite() {
    this.#checkDataExt("image");
    return PIXI.Sprite.from(this.toTexture());
  }
}
