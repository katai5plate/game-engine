import { App } from "./app";
import { TestScene } from "./game/TestScene";

// ゲーム開始
new App(TestScene, {
  title: "H2A_GameEngineDemo",
  width: 816,
  height: 624,
  backgroundColor: 0xaaaaaa,
});
