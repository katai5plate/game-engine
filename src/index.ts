import { App } from "./app";
import { TestScene } from "./game/TestScene";
import { TileScene } from "./game/TileScene";

// ゲーム開始
new App(TileScene, {
  title: "H2A_GameEngineDemo",
  width: 320,
  height: 240,
  backgroundColor: 0xaaaaaa,
});
