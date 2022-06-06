import World from "easyrpg-rtp/chipset/World.png";
import * as PIXI from "pixi.js";
import { Asset } from "../components/objects/Asset";
import { createScene, Scene } from "../components/objects/Scene";
import * as Tilemap from "@pixi/tilemap";
import { Flow } from "../components/objects/Flow";
import { AutoTileMatrix, TileAnimType, tileset } from "./tiles";

// 仕様メモ
// - セルの状態は 0 - 128 で表す
// - セルの集合は Uint8ClampedArray(width * height) に格納

export const TileScene = createScene(
  [World],
  class extends Scene {
    tilemap: Tilemap.CompositeRectTileLayer;
    mapWidth: number;
    mapHeight: number;
    map: Uint8ClampedArray;
    constructor() {
      super();

      this.mapWidth = 100;
      this.mapHeight = 100;
      this.map = new Uint8ClampedArray(this.mapWidth * this.mapHeight);
      this.tilemap = this.spawn(new Tilemap.CompositeTilemap());

      const bmp = new Asset(World).toTexture();

      let pointerPressed = false;

      const tile = (x: number, y: number, value?: number) => {
        const i = this.mapWidth * y + x;
        if (value) {
          this.map[i] = value;
        }
        return this.map[i];
      };
      const tileIndex = (i: number) =>
        new PIXI.Point(i % this.mapWidth, (i / this.mapWidth) | 0);
      const tileIs = (x: number, y: number, tileId: number) =>
        tile(x, y) === tileId;
      const matile = (
        targetX: number,
        targetY: number,
        tileId: number,
        matrix: AutoTileMatrix
      ) => {
        let r = true;
        for (let x = 0; x < matrix.length; x++) {
          for (let y = 0; y < matrix[x].length; y++) {
            if (r !== false) {
              const m = matrix[y][x];
              const h = tileIs(targetX + (x - 1), targetY + (y - 1), tileId);
              if (m === true) {
                r = h;
              } else if (m === false) {
                r = !h;
              }
            }
          }
        }
        return r;
      };
      const rect = (m: number, x: number, y: number, w = 1, h = 1) =>
        new PIXI.Rectangle(x * m, y * m, m * w, m * h);
      const deco = (
        tileX: number,
        tileY: number,
        decoX: number,
        decoY: number
      ): [number, number] => [tileX * 16 + decoX * 8, tileY * 16 + decoY * 8];

      this.interactivePanel.on("pointerdown", (e: PIXI.InteractionEvent) => {
        pointerPressed = true;
      });
      this.interactivePanel.on("pointerup", (e: PIXI.InteractionEvent) => {
        pointerPressed = false;
      });
      this.interactivePanel.on("pointermove", (e: PIXI.InteractionEvent) => {
        if (pointerPressed) {
          this.tilemap.clear();
          const SEA = 1;
          const { x: px, y: py } = e.data.global;
          const [tx, ty] = [Math.floor(px / 16), Math.floor(py / 16)];
          tile(tx, ty, SEA);
          this.map.forEach((v, i) => {
            const { x, y } = tileIndex(i);
            tileset.forEach(({ frame, animType, autoTileRules }, id) => {
              if (v === id) {
                bmp.frame = rect(8, ...frame);
                this.tilemap.tile(bmp, x * 16, y * 16);
                if (animType === TileAnimType.EASY_RPG_SEA) {
                  this.tilemap.tileAnimX(16, 2);
                  this.tilemap.tileAnimX(16, 3);
                }
                autoTileRules?.forEach(({ frame, pos, matrix }) => {
                  if (matile(x, y, id, matrix)) {
                    bmp.frame = rect(8, ...frame);
                    this.tilemap.tile(bmp, ...deco(x, y, ...pos));
                  }
                });
                if (animType === TileAnimType.EASY_RPG_SEA) {
                  this.tilemap.tileAnimX(16, 2);
                  this.tilemap.tileAnimX(16, 3);
                }
              }
            });
          });
        }
      });

      this.ready();
    }
    async main() {
      let sea = 0;
      Flow.loop(async () => {
        sea++;
        $app.renderer.plugins.tilemap.tileAnim[0] = [0, 1, 2, 1][sea % 4];
        await Flow.time(1);
      });
    }
  }
);
