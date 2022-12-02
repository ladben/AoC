import * as path from 'path';
import * as fs from 'fs';

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/09_SmokeBasin.txt'),
  { encoding: 'utf8', flag: 'r' }
);

const areaMap: number[][] = data.split('\n').map((e: string) => {
  return e.split('').map((elem: string) => parseInt(elem));
});

function findAdjacentHeigths(area: number[][], position: number[]): number[] {
  const x: number = position[0];
  const y: number = position[1];

  let left: number = undefined;
  let top: number = undefined;
  let right: number = undefined;
  let bottom: number = undefined;

  try {
    left = area[y][x - 1];
  } catch (e) {}
  try {
    top = area[y - 1][x];
  } catch (e) {}
  try {
    right = area[y][x + 1];
  } catch (e) {}
  try {
    bottom = area[y + 1][x];
  } catch (e) {
  } finally {
    return [left, top, right, bottom];
  }
}

function islocallyLowest(value: number, adjacentArr: number[]): boolean {
  const filteredForLower: number[] = adjacentArr.filter(
    (e: number) => e <= value
  );
  return filteredForLower.length === 0;
}

const lowPoints: number[][] = [];

areaMap.forEach((row: number[], rowIndex: number) => {
  row.forEach((value: number, columnIndex: number) => {
    const adjacentArr: number[] = findAdjacentHeigths(areaMap, [
      columnIndex,
      rowIndex,
    ]);
    if (islocallyLowest(value, adjacentArr)) {
      lowPoints.push([columnIndex, rowIndex]);
    }
  });
});

// we have the low points at this point

const riskLevelSum: number = lowPoints
  .map((e: number[]) => 1 + areaMap[e[1]][e[0]])
  .reduce((acc: number, curr: number) => acc + curr);

console.log(riskLevelSum);

// --------- Part Two ----------

interface Point {
  x: number;
  y: number;
  value?: number;
}

function findHigherAdjacentPoints(map: number[][], point: Point): Point[] {
  const adjacentPoints: Point[] = [
    { x: point.x - 1, y: point.y },
    { x: point.x, y: point.y - 1 },
    { x: point.x + 1, y: point.y },
    { x: point.x, y: point.y + 1 },
  ];

  const adjacentValueArr: number[] = findAdjacentHeigths(map, [
    point.x,
    point.y,
  ]);

  const higherAdjacentPoints: Point[] = [];

  adjacentValueArr.forEach((e: number, i: number) => {
    if (e > point.value) {
      let newHigherPoint: Point = adjacentPoints[i];
      newHigherPoint.value = e;
      higherAdjacentPoints.push(newHigherPoint);
    }
  });

  return higherAdjacentPoints;
}

function reduceBasin(map: number[][], point: Point, basin: number[]): void {
  const higherAdjacentPoints: Point[] = findHigherAdjacentPoints(map, point);

  if (!higherAdjacentPoints.length) {
    return;
  } else if (
    higherAdjacentPoints
      .map((e: Point) => e.value)
      .filter((elem: number) => elem !== 9).length === 0
  ) {
    basin.push(point.value);
    map[point.y][point.x] = undefined;
    return;
  } else {
    higherAdjacentPoints.forEach((e: Point) => {
      if (e.value !== 9) {
        basin.push(point.value);
        map[point.y][point.x] = undefined;
        return;
        //return reduceBasin(map, e, basin);
      }
    });
  }
}

let basinSizes: number[] = [];
let basin: number[];

// reduceBasin(areaMap, { x: 1, y: 0, value: 1 }, basin);
// console.log(areaMap);
const asd = findHigherAdjacentPoints(areaMap, { x: 1, y: 0, value: 1 });

console.log(asd);
