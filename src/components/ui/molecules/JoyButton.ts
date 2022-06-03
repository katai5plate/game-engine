import { LabeledButton } from "../molecules/LabeledButton";

type OriginCP = ConstructorParameters<typeof LabeledButton>;

export class JoyButton extends LabeledButton {
  constructor(
    texture: OriginCP[0],
    text: OriginCP[1],
    { x, y, textStyle }: OriginCP[2] = {}
  ) {
    super(texture, text, { x, y, textStyle });
  }
}
