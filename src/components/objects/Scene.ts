import * as PIXI from "pixi.js";
import { UpdateProps } from "../../app";

export class Scene extends PIXI.Container {
  gameObjects: Record<string, PIXI.Container> = {};
  constructor() {
    super();
    this.setup();
  }
  setup() {}
  update(props: UpdateProps) {}
  getGameObject<T = PIXI.Container>(name: string) {
    return this.gameObjects[name] as unknown as T;
  }
}
