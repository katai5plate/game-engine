import { Scene, SceneData } from "../objects/Scene";

/**
 * シーンの読み込み関連
 */
export class SceneManager {
  currentScene: Scene = new Scene();
  constructor() {}
  /** シーン遷移 */
  async _gotoScene(sceneData: SceneData<any>) {
    $app.stage.removeChild(this.currentScene);
    console.time("SCENE LOADED");
    console.log("SCENE LOADING... (PRELOAD ASSETS)");
    sceneData.assetUrls.forEach((url: string) =>
      $app.loader.add(url, `./dist/${url}`)
    );
    await new Promise((r) => $app.loader.load(r));
    this.currentScene = new sceneData.scene();
    $app.stage.addChild(this.currentScene);
    console.timeEnd("SCENE LOADED");
  }
}
