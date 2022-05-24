import * as PIXI from "pixi.js";

export class Scene extends PIXI.Container {
  gameObjects: Record<string, PIXI.Container> = {};
  constructor() {
    super();
    this.setup();
  }
  setup() {}
  update(deltaTime: number) {}
  getGameObject<T = PIXI.Container>(name: string) {
    return this.gameObjects[name] as unknown as T;
  }
}
