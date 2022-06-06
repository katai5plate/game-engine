import { uuid } from "../utils/helper";

export type AutoTileMatrix = [
  [null | boolean, null | boolean, null | boolean],
  [null | boolean, null | boolean, null | boolean],
  [null | boolean, null | boolean, null | boolean]
];

export interface AutoTileRule {
  /** 半マスでのトリミング情報 */
  frame: [x: number, y: number, w?: number, h?: number];
  /** 半マスでの設置位置 */
  pos: [x: 0 | 1, y: 0 | 1];
  matrix: AutoTileMatrix;
}

export enum TileAnimType {
  NONE = "",
  EASY_RPG_SEA = "EASY_RPG_SEA",
}

export interface TileSetting {
  name: string;
  grid: number;
  /** grid での左上位置 */
  origin: [x: number, y: number];
  /** grid でのトリミング情報 */
  frame: [x: number, y: number, w?: number, h?: number];
  animType?: TileAnimType;
  autoTileRules?: AutoTileRule[];
}

const easyRPGAutoTileRules = {
  terrain: [
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

export const tileset: TileSetting[] = [
  {
    name: "background",
    grid: 16,
    origin: [0, 0],
    frame: [18, 8, 2, 2],
  },
  {
    name: "sea",
    grid: 8,
    origin: [0, 0],
    frame: [0, 8, 2, 2],
    animType: TileAnimType.EASY_RPG_SEA,
    autoTileRules: easyRPGAutoTileRules.sea,
  },
  {
    name: "ocean",
    grid: 8,
    origin: [0, 8],
    frame: [0, 6, 2, 2],
    animType: TileAnimType.EASY_RPG_SEA,
    autoTileRules: easyRPGAutoTileRules.sea,
  },
  {
    name: "plain",
    grid: 8,
    origin: [0, 16],
    frame: [3, 3, 2, 2],
    autoTileRules: easyRPGAutoTileRules.terrain,
  },
  {
    name: "grass",
    grid: 8,
    origin: [6, 16],
    frame: [3, 3, 2, 2],
    autoTileRules: easyRPGAutoTileRules.terrain,
  },
  {
    name: "mountain",
    grid: 8,
    origin: [6, 24],
    frame: [3, 3, 2, 2],
    autoTileRules: easyRPGAutoTileRules.terrain,
  },
];
