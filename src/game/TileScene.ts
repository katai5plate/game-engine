import World from "easyrpg-rtp/chipset/World.png";
import * as PIXI from "pixi.js";
import { Asset } from "../components/objects/Asset";
import { createScene, Scene } from "../components/objects/Scene";
import * as Tilemap from "@pixi/tilemap";
import { Flow } from "../components/objects/Flow";

export const TileScene = createScene(
  [World],
  class extends Scene {
    tilemap: Tilemap.CompositeRectTileLayer;
    map: Uint8Array[] = [...new Array(100)].map(() => new Uint8Array(100));
    constructor() {
      super();

      const sets = new Asset(World).toTexture();
      sets.frame = new PIXI.Rectangle(0, 128, 16, 16);

      this.tilemap = this.spawn(new Tilemap.CompositeTilemap());
      this.tilemap.tile(sets, 0, 0);

      console.log(sets, this.tilemap);

      let pointerPressed = false;

      const tile = (x: number, y: number, n: number) =>
        this.map?.[x]?.[y] === n;
      const matile = (
        targetX: number,
        targetY: number,
        value: number,
        matrix: [
          [boolean | null, boolean | null, boolean | null],
          [boolean | null, boolean | null, boolean | null],
          [boolean | null, boolean | null, boolean | null]
        ]
      ) => {
        let r = true;
        for (let x = 0; x < matrix.length; x++) {
          for (let y = 0; y < matrix[x].length; y++) {
            if (r !== false) {
              const m = matrix[y][x];
              const h = tile(targetX + (x - 1), targetY + (y - 1), value);
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
          const SEA = 0x1;
          const { x: px, y: py } = e.data.global;
          const [tx, ty] = [Math.floor(px / 16), Math.floor(py / 16)];
          this.map[tx][ty] = SEA;
          this.map.forEach((xa, x) => {
            xa.forEach((ya, y) => {
              if (ya === SEA) {
                // 通常海
                sets.frame = rect(16, 0, 5);
                this.tilemap.tile(sets, x * 16, y * 16);
                this.tilemap.tileAnimX(16, 2);
                this.tilemap.tileAnimX(16, 3);

                // オートタイル
                if (
                  matile(x, y, SEA, [
                    [null, null, null],
                    [false, true, null],
                    [null, null, null],
                  ])
                ) {
                  sets.frame = rect(8, 0, 2, 1, 2);
                  this.tilemap.tile(sets, ...deco(x, y, 0, 0));
                }
                if (
                  matile(x, y, SEA, [
                    [null, null, null],
                    [null, true, false],
                    [null, null, null],
                  ])
                ) {
                  sets.frame = rect(8, 1, 2, 1, 2);
                  this.tilemap.tile(sets, ...deco(x, y, 1, 0));
                }
                if (
                  matile(x, y, SEA, [
                    [null, false, null],
                    [null, true, null],
                    [null, null, null],
                  ])
                ) {
                  sets.frame = rect(8, 0, 4, 2, 1);
                  this.tilemap.tile(sets, ...deco(x, y, 0, 0));
                }
                if (
                  matile(x, y, SEA, [
                    [null, null, null],
                    [null, true, null],
                    [null, false, null],
                  ])
                ) {
                  sets.frame = rect(8, 0, 5, 2, 1);
                  this.tilemap.tile(sets, ...deco(x, y, 0, 1));
                }
                if (
                  matile(x, y, SEA, [
                    [false, false, null],
                    [false, true, null],
                    [null, null, null],
                  ])
                ) {
                  sets.frame = rect(8, 0, 0);
                  this.tilemap.tile(sets, ...deco(x, y, 0, 0));
                }
                if (
                  matile(x, y, SEA, [
                    [null, false, false],
                    [null, true, false],
                    [null, null, null],
                  ])
                ) {
                  sets.frame = rect(8, 1, 0);
                  this.tilemap.tile(sets, ...deco(x, y, 1, 0));
                }
                if (
                  matile(x, y, SEA, [
                    [null, null, null],
                    [false, true, null],
                    [false, false, null],
                  ])
                ) {
                  sets.frame = rect(8, 0, 1);
                  this.tilemap.tile(sets, ...deco(x, y, 0, 1));
                }
                if (
                  matile(x, y, SEA, [
                    [null, null, null],
                    [null, true, false],
                    [null, false, false],
                  ])
                ) {
                  sets.frame = rect(8, 1, 1);
                  this.tilemap.tile(sets, ...deco(x, y, 1, 1));
                }
                if (
                  matile(x, y, SEA, [
                    [false, true, null],
                    [true, true, null],
                    [null, null, null],
                  ])
                ) {
                  sets.frame = rect(8, 0, 6);
                  this.tilemap.tile(sets, ...deco(x, y, 0, 0));
                }
                if (
                  matile(x, y, SEA, [
                    [null, true, false],
                    [null, true, true],
                    [null, null, null],
                  ])
                ) {
                  sets.frame = rect(8, 1, 6);
                  this.tilemap.tile(sets, ...deco(x, y, 1, 0));
                }
                if (
                  matile(x, y, SEA, [
                    [null, null, null],
                    [true, true, null],
                    [false, true, null],
                  ])
                ) {
                  sets.frame = rect(8, 0, 7);
                  this.tilemap.tile(sets, ...deco(x, y, 0, 1));
                }
                if (
                  matile(x, y, SEA, [
                    [null, null, null],
                    [null, true, true],
                    [null, true, false],
                  ])
                ) {
                  sets.frame = rect(8, 1, 7);
                  this.tilemap.tile(sets, ...deco(x, y, 1, 1));
                }
                this.tilemap.tileAnimX(16, 2);
                this.tilemap.tileAnimX(16, 3);
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
