import * as PIXI from "pixi.js";
import * as PIXITilemap from "@pixi/tilemap";
import { XY, Rect } from "./math";

export type AutoTileMatrix = [
  [null | boolean, null | boolean, null | boolean],
  [null | boolean, null | boolean, null | boolean],
  [null | boolean, null | boolean, null | boolean]
];

export interface AutoTileRule {
  /** 半マスでのトリミング情報 */
  frame: [x: number, y: number, w?: number, h?: number];
  /** 半マスでの設置位置 */
  pos: [x: 0 | 1, y: 0 | 1];
  matrix: AutoTileMatrix;
}

export enum TileAnimType {
  NONE = "",
  EASY_RPG_SEA = "EASY_RPG_SEA",
}

export interface Terrain {
  name: string;
  grid: number;
  /** grid での左上位置 */
  origin: [x: number, y: number];
  /** grid でのトリミング情報 */
  frame: [x: number, y: number, w?: number, h?: number];
  animType?: TileAnimType;
  autoTileRules?: AutoTileRule[];
}

export interface Tileset {
  transColor?: [r: number, g: number, b: number];
  terrains: Terrain[];
}

/**
 * タイルマップ描画
 */
export class Tilemap extends PIXITilemap.CompositeRectTileLayer {
  #tilemapTexture: PIXI.Texture;
  #tileSettings: Tileset;
  #tileAlpha: number = 1;
  mapWidth: number;
  mapHeight: number;
  map: Uint8ClampedArray;

  constructor(
    texture: PIXI.Texture,
    tilesettings: Tileset,
    width: number,
    height: number
  ) {
    super();
    this.#tileSettings = tilesettings;
    this.mapWidth = width;
    this.mapHeight = height;

    if (this.#tileSettings.transColor) {
      this.#tilemapTexture = this.chromaTexture(
        texture,
        this.#tileSettings.transColor
      );
    } else {
      this.#tilemapTexture = texture;
    }

    this.map = new Uint8ClampedArray(this.mapWidth * this.mapHeight);

    this.updateMap();
  }
  /** 表示を更新する */
  updateMap() {
    this.clear();
    this.map.forEach((v, i) => {
      const { x, y } = this.#tileIndex(i);
      this.#tileSettings.terrains.forEach(
        ({ grid, origin, frame, animType, autoTileRules }, id) => {
          if (v === id) {
            const [fx, fy, fw, fh] = [
              frame[0] + origin[0],
              frame[1] + origin[1],
              frame[2],
              frame[3],
            ];
            this.#tilemapTexture.frame = new Rect(fx, fy, fw, fh).mul(grid); // this.#mulRect(grid, fx, fy, fw, fh);
            this.tile(this.#tilemapTexture, x * 16, y * 16, {
              alpha: this.#tileAlpha,
            });
            if (animType === TileAnimType.EASY_RPG_SEA) {
              this.tileAnimX(16, 2);
              this.tileAnimX(16, 3);
            }
            autoTileRules?.forEach(({ frame, pos, matrix }) => {
              if (this.#applyAutoTileRule(x, y, id, matrix)) {
                const [fx, fy, fw, fh] = [
                  frame[0] + origin[0],
                  frame[1] + origin[1],
                  frame[2],
                  frame[3],
                ];
                this.#tilemapTexture.frame = new Rect(fx, fy, fw, fh).mul(grid);
                this.tile(
                  this.#tilemapTexture,
                  ...this.#decorationPosition(x, y, ...pos),
                  { alpha: this.#tileAlpha }
                );
              }
            });
            if (animType === TileAnimType.EASY_RPG_SEA) {
              this.tileAnimX(16, 2);
              this.tileAnimX(16, 3);
            }
          }
        }
      );
    });
  }
  /** テクスチャから特定の色を透明化 */
  chromaTexture(
    texture: PIXI.Texture,
    color: [r: number, g: number, b: number]
  ) {
    const img = (texture.baseTexture.resource as any)
      .source as HTMLImageElement;
    const canvas = document.createElement("CANVAS") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const image = ctx.getImageData(0, 0, img.width, img.height);
    for (let i = 0; i < image.data.length; i += 4) {
      if (image.data.slice(i, i + 3).join() === color.join())
        image.data[i + 3] = 0;
    }
    ctx.putImageData(image, 0, 0);
    return new PIXI.Texture(PIXI.BaseTexture.from(canvas));
  }
  /** 特定の座標のタイルIDを取得または設定 */
  setTile(x: number, y: number, value: number) {
    const i = this.mapWidth * y + x;
    this.map[i] = value;
  }
  /** 特定の座標のタイルIDを取得または設定 */
  getTile(x: number, y: number) {
    const i = this.mapWidth * y + x;
    return this.map[i];
  }
  /** this.map のインデックスから XY を取得 */
  #tileIndex(i: number) {
    return new XY(i % this.mapWidth, (i / this.mapWidth) | 0);
  }
  /** オートタイルを設定 */
  #applyAutoTileRule(
    targetX: number,
    targetY: number,
    tileId: number,
    matrix: AutoTileMatrix
  ) {
    let r = true;
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        if (r !== false) {
          const m = matrix[y][x];
          const t = this.getTile(targetX + (x - 1), targetY + (y - 1));
          const h = t === tileId;
          if (m === true) {
            r = h;
          } else if (m === false) {
            r = !h;
          }
        }
      }
    }
    return r;
  }
  /** タイルにデコレーションする座標を指定 */
  #decorationPosition(
    tileX: number,
    tileY: number,
    decoX: number,
    decoY: number
  ): [number, number] {
    return [tileX * 16 + decoX * 8, tileY * 16 + decoY * 8];
  }
  /** タイルアニメーション番号を指定 */
  setTileAnim(x?: number | null, y?: number | null) {
    const { tilemap: t } = $app.renderer.plugins;
    t.tileAnim[0] = x ?? t.tileAnim[0];
    t.tileAnim[1] = y ?? t.tileAnim[1];
  }
  /** 透明度を変更する */
  setAlpha(alpha: number) {
    this.#tileAlpha = alpha;
    this.updateMap();
  }
}
