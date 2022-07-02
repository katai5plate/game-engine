import { AutoTileRule } from "../../components/objects/Tilemap";

export const rules = {
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
