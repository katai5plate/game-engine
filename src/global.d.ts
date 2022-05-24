import { App } from "./app";

declare global {
  var $app: App;
  var $isTest: boolean;
}
