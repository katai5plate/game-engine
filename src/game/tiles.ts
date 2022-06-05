import { uuid } from "../utils/helper";

export type AutoTileMatrix = [
  [null | boolean, null | boolean, null | boolean],
  [null | boolean, null | boolean, null | boolean],
  [null | boolean, null | boolean, null | boolean]
];

export interface AutoTilePattern {
  /** 半マスでのトリミング情報 */
  frame: [x: number, y: number, w?: number, h?: number];
  /** 半マスでの設置位置 */
  pos: [x: 0 | 1, y: 0 | 1];
  matrix: AutoTileMatrix;
}

export enum TileAnimPattern {
  NONE = "",
  EASY_RPG_SEA = "EASY_RPG_SEA",
}

export interface TileSetting {
  id: string;
  name: string;
  /** 半マスでのトリミング情報 */
  frame: [x: number, y: number, w?: number, h?: number];
  animPattern: TileAnimPattern;
  autoTilePatterns: AutoTilePattern[];
}

export const tileset: TileSetting[] = [
  {
    id: uuid(),
    name: "sea",
    frame: [0, 8, 2, 2],
    animPattern: TileAnimPattern.EASY_RPG_SEA,
    autoTilePatterns: [
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
    ],
  },
];
