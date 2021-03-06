import World from "easyrpg-rtp/chipset/World.png";
import * as PIXI from "pixi.js";
import { Asset } from "../../components/objects/Asset";
import { createScene, Scene } from "../../components/objects/Scene";
import { Flow } from "../../components/objects/Flow";
import { tileset } from "../../presets/tilesets/easyrpg/basic";
import { Tilemap } from "../../components/objects/Tilemap";
import { zip, unzip } from "../../utils/helper";
import * as se from "../../presets/synth/se/factory";

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
        new Tilemap(new Asset(World).toTexture(), tileset, 40, 30)
      );
      this.upperTilemap = this.spawn(
        new Tilemap(new Asset(World).toTexture(), tileset, 40, 30)
      );
      this.label = this.spawn(
        new PIXI.Text(
          "マウスホイールでタイル変更\n 右クリックでレイヤー変更\n ドラッグでお絵描き\n Enterで出力, Spaceで読込\n 方向キーでスクロール\n UIがないのでログを見ながら操作する",
          {
            fontSize: 12,
          }
        )
      );
      console.log(this);

      this.lowerTilemap.updateMap();
      this.upperTilemap.updateMap();

      $app.useSynth.setVolume(0.5, 0.5);

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
        if ($app.useMouse.isClicked("RIGHT")) {
          $app.useSynth.playSe(se.coin);
          this.paintLayerId = this.paintLayerId === 0 ? 1 : 0;
          this.lowerTilemap.setAlpha(this.paintLayerId === 1 ? 0.5 : 1);
          this.upperTilemap.setAlpha(this.paintLayerId === 0 ? 0.5 : 1);
          console.log(this.paintLayerId === 0 ? "下層" : "上層", "レイヤー");
        }
        if ($app.useMouse.isClicked("CENTER")) {
          $app.useSynth.playSe(se.jump);
          this.paintTileId = 0;
          console.log(`タイル選択: ${tileset.terrains[0].name}`);
        }
        if ($app.useMouse.isWheelUp()) {
          $app.useSynth.playSe(se.pick);
          this.paintTileId =
            this.paintTileId === tileset.terrains.length - 1
              ? 0
              : this.paintTileId + 1;
          console.log(`タイル選択: ${tileset.terrains[this.paintTileId].name}`);
        }
        if ($app.useMouse.isWheelDown()) {
          $app.useSynth.playSe(se.pick);
          this.paintTileId =
            this.paintTileId === 0
              ? tileset.terrains.length - 1
              : this.paintTileId - 1;
          console.log(`タイル選択: ${tileset.terrains[this.paintTileId].name}`);
        }
        // マウス座標の先にタイルを設定
        if ($app.useMouse.isPressed() || $app.useTouch.isPressed()) {
          const positions = $app.useMouse.isPressed()
            ? [$app.useMouse.getScreenPosition()]
            : $app.useTouch.getScreenPositions();
          positions.forEach(({ x: px, y: py }) => {
            const { x: cx, y: cy } = $app.useCamera.getPosition();
            const [wx, wy] = [px - cx, py - cy];
            const [tx, ty] = [Math.floor(wx / 16), Math.floor(wy / 16)];
            if (this.paintLayerId === 0) {
              const tile = this.lowerTilemap.getTile(tx, ty);
              if (tile !== this.paintTileId && tile !== undefined) {
                $app.useSynth.playSe(se.dig);
              }
              this.lowerTilemap.setTile(tx, ty, this.paintTileId);
              this.lowerTilemap.updateMap();
            } else {
              if (this.upperTilemap.getTile(tx, ty) !== this.paintTileId) {
                $app.useSynth.playSe(se.dig);
              }
              this.upperTilemap.setTile(tx, ty, this.paintTileId);
              this.upperTilemap.updateMap();
            }
          });
        }
        if ($app.useKey.isTriggered("ENTER")) {
          $app.useSynth.playSe(se.powerup);
          console.log("マップデータ出力", {
            data: zip(
              JSON.stringify([
                [...this.lowerTilemap.map],
                [...this.upperTilemap.map],
              ])
            ),
          });
        }
        if ($app.useKey.isTriggered("SPACE")) {
          try {
            const input = prompt("マップデータ入力");
            const [lower, upper] = JSON.parse(
              unzip(JSON.parse(input as string).data) as string
            );
            this.lowerTilemap.map = new Uint8ClampedArray(lower);
            this.upperTilemap.map = new Uint8ClampedArray(upper);
            this.lowerTilemap.updateMap();
            this.upperTilemap.updateMap();
            $app.useSynth.playSe(se.bomb);
          } catch (error) {
            console.warn(error);
          }
        }
        Flow.use.moveLikeRPG($app._camera.getPosition(), 0.1, 16, {
          reverse: { x: true, y: true },
        });
      });
    }
  }
);
