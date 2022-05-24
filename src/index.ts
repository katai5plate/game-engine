import * as PIXI from "pixi.js";
import { App } from "./app";
import { InitScene } from "./components/scenes/InitScene";

// ゲーム開始
new App(InitScene, {
  width: 816,
  height: 624,
  backgroundColor: 0xaaaaaa,
  enableDevTools: true,
});
