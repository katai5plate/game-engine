import World from "easyrpg-rtp/chipset/World.png";
import * as PIXI from "pixi.js";
import { Asset } from "../components/objects/Asset";
import { createScene, Scene } from "../components/objects/Scene";
import { Flow } from "../components/objects/Flow";
import { tileset } from "./tiles";
import { Tilemap } from "../components/objects/Tilemap";
import { zip, unzip } from "../utils/helper";

export const MapEditorScene = createScene(
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
          "マウスホイールでタイル変更\n 右クリックでレイヤー変更\n ドラッグでお絵描き\n Enterで出力, Spaceで読込\n UIがないのでログを見ながら操作する",
          {
            fontSize: 12,
          }
        )
      );
      console.log(this);

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
        if ($app.getMouse().isClicked("RIGHT")) {
          this.paintLayerId = this.paintLayerId === 0 ? 1 : 0;
          this.lowerTilemap.setAlpha(this.paintLayerId === 1 ? 0.5 : 1);
          this.upperTilemap.setAlpha(this.paintLayerId === 0 ? 0.5 : 1);
          console.log(this.paintLayerId === 0 ? "下層" : "上層", "レイヤー");
        }
        if ($app.getMouse().isClicked("CENTER")) {
          this.paintTileId = 0;
          console.log(`タイル選択: ${tileset.terrains[0].name}`);
        }
        if ($app.getMouse().isWheelUp()) {
          this.paintTileId =
            this.paintTileId === tileset.terrains.length - 1
              ? 0
              : this.paintTileId + 1;
          console.log(`タイル選択: ${tileset.terrains[this.paintTileId].name}`);
        }
        if ($app.getMouse().isWheelDown()) {
          this.paintTileId =
            this.paintTileId === 0
              ? tileset.terrains.length - 1
              : this.paintTileId - 1;
          console.log(`タイル選択: ${tileset.terrains[this.paintTileId].name}`);
        }
        if ($app.getMouse().isPressed("LEFT")) {
          // マウス座標の先にタイルを設定
          const { x: px, y: py } = $app.getMouse().getPosition();
          const [tx, ty] = [Math.floor(px / 16), Math.floor(py / 16)];
          if (this.paintLayerId === 0) {
            this.lowerTilemap.setTile(tx, ty, this.paintTileId);
            this.lowerTilemap.updateMap();
          } else {
            this.upperTilemap.setTile(tx, ty, this.paintTileId);
            this.upperTilemap.updateMap();
          }
        }
        if ($app.getKey("ENTER").isTriggered) {
          console.log("マップデータ出力", {
            data: zip(
              JSON.stringify([
                [...this.lowerTilemap.map],
                [...this.upperTilemap.map],
              ])
            ),
          });
        }
        if ($app.getKey("SPACE").isTriggered) {
          try {
            const input = prompt("マップデータ入力");
            const [lower, upper] = JSON.parse(
              unzip(JSON.parse(input as string).data) as string
            );
            this.lowerTilemap.map = new Uint8ClampedArray(lower);
            this.upperTilemap.map = new Uint8ClampedArray(upper);
            this.lowerTilemap.updateMap();
            this.upperTilemap.updateMap();
          } catch (error) {
            console.warn(error);
          }
        }
      });
    }
  }
);
