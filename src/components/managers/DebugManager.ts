import * as PIXI from "pixi.js";
import { toGlobalForDebug } from "../../utils/helper";

export class DebugManager {
  constructor() {
    const win = window as any;
    // Pixi DevTools
    toGlobalForDebug({ PIXI });
    // VConsole (HTMLから読み込み)
    if (win?.VConsole) toGlobalForDebug({ $vc: new win.VConsole() });
  }
}
