import {
  AutoTileRule,
  TileAnimType,
  Tileset,
} from "../components/objects/Tilemap";

const easyRPGAutoTileRules = {
  land: [
    {
      frame: [0, 4, 1, 2],
      pos: [0, 0],
      matrix: [
        [null, null, null],
        [false, true, null],
        [null, null, null],
      ],
    },
    {
      frame: [5, 4, 1, 2],
      pos: [1, 0],
      matrix: [
        [null, null, null],
        [null, true, false],
        [null, null, null],
      ],
    },
    {
      frame: [2, 2, 2, 1],
      pos: [0, 0],
      matrix: [
        [null, false, null],
        [null, true, null],
        [null, null, null],
      ],
    },
    {
      frame: [2, 7, 2, 1],
      pos: [0, 1],
      matrix: [
        [null, null, null],
        [null, true, null],
        [null, false, null],
      ],
    },
    {
      frame: [0, 2],
      pos: [0, 0],
      matrix: [
        [false, false, null],
        [false, true, null],
        [null, null, null],
      ],
    },
    {
      frame: [5, 2],
      pos: [1, 0],
      matrix: [
        [null, false, false],
        [null, true, false],
        [null, null, null],
      ],
    },
    {
      frame: [0, 7],
      pos: [0, 1],
      matrix: [
        [null, null, null],
        [false, true, null],
        [false, false, null],
      ],
    },
    {
      frame: [5, 7],
      pos: [1, 1],
      matrix: [
        [null, null, null],
        [null, true, false],
        [null, false, false],
      ],
    },
    {
      frame: [4, 0],
      pos: [0, 0],
      matrix: [
        [false, true, null],
        [true, true, null],
        [null, null, null],
      ],
    },
    {
      frame: [5, 0],
      pos: [1, 0],
      matrix: [
        [null, true, false],
        [null, true, true],
        [null, null, null],
      ],
    },
    {
      frame: [4, 1],
      pos: [0, 1],
      matrix: [
        [null, null, null],
        [true, true, null],
        [false, true, null],
      ],
    },
    {
      frame: [5, 1],
      pos: [1, 1],
      matrix: [
        [null, null, null],
        [null, true, true],
        [null, true, false],
      ],
    },
  ] as AutoTileRule[],
  sea: [
    {
      frame: [0, 2, 1, 2],
      pos: [0, 0],
      matrix: [
        [null, null, null],
        [false, true, null],
        [null, null, null],
      ],
    },
    {
      frame: [1, 2, 1, 2],
      pos: [1, 0],
      matrix: [
        [null, null, null],
        [null, true, false],
        [null, null, null],
      ],
    },
    {
      frame: [0, 4, 2, 1],
      pos: [0, 0],
      matrix: [
        [null, false, null],
        [null, true, null],
        [null, null, null],
      ],
    },
    {
      frame: [0, 5, 2, 1],
      pos: [0, 1],
      matrix: [
        [null, null, null],
        [null, true, null],
        [null, false, null],
      ],
    },
    {
      frame: [0, 0],
      pos: [0, 0],
      matrix: [
        [false, false, null],
        [false, true, null],
        [null, null, null],
      ],
    },
    {
      frame: [1, 0],
      pos: [1, 0],
      matrix: [
        [null, false, false],
        [null, true, false],
        [null, null, null],
      ],
    },
    {
      frame: [0, 1],
      pos: [0, 1],
      matrix: [
        [null, null, null],
        [false, true, null],
        [false, false, null],
      ],
    },
    {
      frame: [1, 1],
      pos: [1, 1],
      matrix: [
        [null, null, null],
        [null, true, false],
        [null, false, false],
      ],
    },
    {
      frame: [0, 6],
      pos: [0, 0],
      matrix: [
        [false, true, null],
        [true, true, null],
        [null, null, null],
      ],
    },
    {
      frame: [1, 6],
      pos: [1, 0],
      matrix: [
        [null, true, false],
        [null, true, true],
        [null, null, null],
      ],
    },
    {
      frame: [0, 7],
      pos: [0, 1],
      matrix: [
        [null, null, null],
        [true, true, null],
        [false, true, null],
      ],
    },
    {
      frame: [1, 7],
      pos: [1, 1],
      matrix: [
        [null, null, null],
        [null, true, true],
        [null, true, false],
      ],
    },
  ] as AutoTileRule[],
};

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
      autoTileRules: easyRPGAutoTileRules.sea,
    },
    {
      name: "海（深）",
      grid: 8,
      origin: [0, 8],
      frame: [0, 6, 2, 2],
      animType: TileAnimType.EASY_RPG_SEA,
      autoTileRules: easyRPGAutoTileRules.sea,
    },
    {
      name: "草原",
      grid: 8,
      origin: [0, 16],
      frame: [3, 3, 2, 2],
      autoTileRules: easyRPGAutoTileRules.land,
    },
    {
      name: "草むら",
      grid: 8,
      origin: [6, 16],
      frame: [3, 3, 2, 2],
      autoTileRules: easyRPGAutoTileRules.land,
    },
    {
      name: "山",
      grid: 8,
      origin: [6, 24],
      frame: [3, 3, 2, 2],
      autoTileRules: easyRPGAutoTileRules.land,
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
