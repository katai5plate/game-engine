import World from "easyrpg-rtp/chipset/World.png";
import * as PIXI from "pixi.js";
import { Asset } from "../components/objects/Asset";
import { createScene, Scene } from "../components/objects/Scene";
import { Flow } from "../components/objects/Flow";
import { tileset } from "./tiles";
import { Tilemap } from "../components/objects/Tilemap";

export const TileScene = createScene(
  [World],
  class extends Scene {
    lowerTilemap: Tilemap;
    upperTilemap: Tilemap;
    paintTileId: number = 1;
    paintLayerId: 0 | 1 = 0;
    label: PIXI.Text;
    constructor() {
      super();
      this.lowerTilemap = this.spawn(
        new Tilemap(new Asset(World).toTexture(), tileset, 20, 15)
      );
      this.upperTilemap = this.spawn(
        new Tilemap(new Asset(World).toTexture(), tileset, 20, 15)
      );
      this.label = this.spawn(
        new PIXI.Text(
          " 0-7 でタイル変更\n ↑↓でレイヤー変更\n ドラッグでお絵描き\n 内容はログ出力",
          {
            fontSize: 12,
          }
        )
      );
      console.log(this);

      let pointerPressed = false;
      this.interactivePanel.on("pointerdown", (e: PIXI.InteractionEvent) => {
        pointerPressed = true;
      });
      this.interactivePanel.on("pointerup", (e: PIXI.InteractionEvent) => {
        pointerPressed = false;
      });

      this.interactivePanel.on("pointermove", (e: PIXI.InteractionEvent) => {
        if (pointerPressed) {
          // マウス座標の先にタイルを設定
          const { x: px, y: py } = e.data.global;
          const [tx, ty] = [Math.floor(px / 16), Math.floor(py / 16)];
          if (this.paintLayerId === 0) {
            this.lowerTilemap.setTile(tx, ty, this.paintTileId);
            this.lowerTilemap.updateMap();
          } else {
            this.upperTilemap.setTile(tx, ty, this.paintTileId);
            this.upperTilemap.updateMap();
          }
        }
      });
      this.lowerTilemap.updateMap();
      this.upperTilemap.updateMap();

      this.ready();
    }
    async main() {
      let sea = 0;
      Flow.loop(async () => {
        sea++;
        this.lowerTilemap.setTileAnim([0, 1, 2, 1][sea % 4]);
        await Flow.time(0.25);
      });
      Flow.loop(async () => {
        if ($app.getKey("DOWN").isTriggered) {
          this.paintLayerId = 0;
          console.log("下層レイヤー");
        }
        if ($app.getKey("UP").isTriggered) {
          this.paintLayerId = 1;
          console.log("上層レイヤー");
        }
        [...Array(8).keys()].forEach((i) => {
          if ($app.getKey(`${i}` as any).isTriggered) {
            this.paintTileId = i;
            console.log(`タイル選択: ${tileset.terrains[i].name}`);
          }
        });
      });
    }
  }
);
