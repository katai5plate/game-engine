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
    constructor() {
      super();

      const grass = new Asset(World).toTexture();
      grass.frame = new PIXI.Rectangle(0, 128, 16, 16);

      this.tilemap = this.spawn(new Tilemap.CompositeTilemap());
      this.tilemap.clear();
      this.tilemap.tile(grass, 0, 0);

      console.log(grass, this.tilemap);

      let pointerPressed = false;

      this.interactivePanel.on("pointerdown", (e: PIXI.InteractionEvent) => {
        pointerPressed = true;
      });
      this.interactivePanel.on("pointerup", (e: PIXI.InteractionEvent) => {
        pointerPressed = false;
      });
      this.interactivePanel.on("pointermove", (e: PIXI.InteractionEvent) => {
        if (pointerPressed) {
          const { x, y } = e.data.global;
          this.tilemap.tile(
            grass,
            Math.floor(x / 16) * 16,
            Math.floor(y / 16) * 16
          );
        }
      });

      this.ready();
    }
    async main() {}
  }
);
