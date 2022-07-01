import { App } from "./app";
import { TestScene } from "./game/TestScene";
import { MapEditorScene } from "./game/MapEditorScene";

// ゲーム開始
new App(MapEditorScene, {
  title: "H2A_GameEngineDemo",
  width: 320,
  height: 240,
  backgroundColor: 0xaaaaaa,
});
