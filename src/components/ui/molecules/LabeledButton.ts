import * as PIXI from "pixi.js";
import { Button } from "../atoms/Button";

type OriginCP = ConstructorParameters<typeof Button>;

export class LabeledButton extends Button {
  text: PIXI.Text;
  constructor(
    texture: OriginCP[0],
    text: string,
    { x, y, textStyle }: OriginCP[1] & { textStyle?: PIXI.TextStyle } = {}
  ) {
    super(texture, { x, y });
    this.text = new PIXI.Text(text, textStyle);
    this.text.anchor.set(0.5);
    this.addChild(this.text);
  }
}
