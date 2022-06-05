import World from "easyrpg-rtp/chipset/World.png";
import * as PIXI from "pixi.js";
import { Asset } from "../components/objects/Asset";
import { createScene, Scene } from "../components/objects/Scene";
import * as Tilemap from "@pixi/tilemap";
import { Flow } from "../components/objects/Flow";
import { AutoTileMatrix, TileAnimPattern, tileset } from "./tiles";

export const TileScene = createScene(
  [World],
  class extends Scene {
    tilemap: Tilemap.CompositeRectTileLayer;
    map: string[][] = [...new Array(100)].map(() => new Array(100));
    constructor() {
      super();

      const sets = new Asset(World).toTexture();
      sets.frame = new PIXI.Rectangle(0, 128, 16, 16);

      this.tilemap = this.spawn(new Tilemap.CompositeTilemap());
      this.tilemap.tile(sets, 0, 0);

      console.log(sets, this.tilemap);

      let pointerPressed = false;

      const tile = (x: number, y: number, tileId: string) =>
        this.map?.[x]?.[y] === tileId;
      const matile = (
        targetX: number,
        targetY: number,
        tileId: string,
        matrix: AutoTileMatrix
      ) => {
        let r = true;
        for (let x = 0; x < matrix.length; x++) {
          for (let y = 0; y < matrix[x].length; y++) {
            if (r !== false) {
              const m = matrix[y][x];
              const h = tile(targetX + (x - 1), targetY + (y - 1), tileId);
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
          const SEA = tileset[0].id;
          const { x: px, y: py } = e.data.global;
          const [tx, ty] = [Math.floor(px / 16), Math.floor(py / 16)];
          this.map[tx][ty] = SEA;
          this.map.forEach((xa, x) => {
            xa.forEach((ya, y) => {
              tileset.forEach(
                ({ id, frame, animPattern, autoTilePatterns }) => {
                  if (ya === id) {
                    sets.frame = rect(8, ...frame);
                    this.tilemap.tile(sets, x * 16, y * 16);
                    if (animPattern === TileAnimPattern.EASY_RPG_SEA) {
                      this.tilemap.tileAnimX(16, 2);
                      this.tilemap.tileAnimX(16, 3);
                    }
                    autoTilePatterns.forEach(({ frame, pos, matrix }) => {
                      if (matile(x, y, id, matrix)) {
                        sets.frame = rect(8, ...frame);
                        this.tilemap.tile(sets, ...deco(x, y, ...pos));
                      }
                    });
                    if (animPattern === TileAnimPattern.EASY_RPG_SEA) {
                      this.tilemap.tileAnimX(16, 2);
                      this.tilemap.tileAnimX(16, 3);
                    }
                  }
                }
              );
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
