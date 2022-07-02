import { App } from "./app";
import { ButtonTestScene } from "./game/scenes/ButtonTestScene";
import { MapEditorScene } from "./game/scenes/MapEditorScene";
import { TestScene } from "./game/scenes/TestScene";

// ゲーム開始
new App(TestScene, {
  title: "H2A_GameEngineDemo",
  width: 320,
  height: 240,
  backgroundColor: 0xaaaaaa,
});
