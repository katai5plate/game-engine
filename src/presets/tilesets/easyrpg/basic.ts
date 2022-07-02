import { TileAnimType, Tileset } from "../../../components/objects/Tilemap";
import { rules } from "../rules";

export const tileset: Tileset = {
  transColor: [255, 103, 139], // 0xff678b,
  terrains: [
    {
      name: "背景",
      grid: 16,
      origin: [0, 0],
      frame: [18, 8, 1, 1],
    },
    {
      name: "海（浅）",
      grid: 8,
      origin: [0, 0],
      frame: [0, 8, 2, 2],
      animType: TileAnimType.EASY_RPG_SEA,
      autoTileRules: rules.sea,
    },
    // {
    //   name: "海（深）",
    //   grid: 8,
    //   origin: [0, 8],
    //   frame: [0, 6, 2, 2],
    //   animType: TileAnimType.EASY_RPG_SEA,
    //   autoTileRules: easyRPGAutoTileRules.sea,
    // },
    {
      name: "草原",
      grid: 8,
      origin: [0, 16],
      frame: [3, 3, 2, 2],
      autoTileRules: rules.land,
    },
    {
      name: "草むら",
      grid: 8,
      origin: [6, 16],
      frame: [3, 3, 2, 2],
      autoTileRules: rules.land,
    },
    {
      name: "山",
      grid: 8,
      origin: [6, 24],
      frame: [3, 3, 2, 2],
      autoTileRules: rules.land,
    },
    {
      name: "看板",
      grid: 1,
      origin: [416, 48],
      frame: [0, 0, 16, 16],
    },
    {
      name: "大きい山",
      grid: 1,
      origin: [288, 192],
      frame: [0, 0, 32, 32],
    },
  ],
};
