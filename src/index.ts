import { App } from "./app";
import { ButtonTestScene } from "./game/ButtonTestScene";
import { MapEditorScene } from "./game/MapEditorScene";

// ゲーム開始
new App(MapEditorScene, {
  title: "H2A_GameEngineDemo",
  width: 320,
  height: 240,
  backgroundColor: 0xaaaaaa,
});
