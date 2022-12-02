import * as path from 'path';
import * as fs from 'fs';

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/05_HydrothermalVenture.txt'),
  { encoding: 'utf8', flag: 'r' }
);

interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

function checkIfLineIsHorizontal(line: Line): boolean {
  return line.start.y === line.end.y;
}

function checkIfLineIfVertical(line: Line): boolean {
  return line.start.x === line.end.x;
}

function checkVerticalOrHorizontal(line: Line): boolean {
  return checkIfLineIfVertical(line) || checkIfLineIsHorizontal(line);
}

function getPointsInSimpleLine(line: Line): Point[] {
  let points: Point[] = [];
  if (checkIfLineIsHorizontal(line)) {
    const start: number = Math.min(line.start.x, line.end.x);
    const end: number = Math.max(line.start.x, line.end.x);
    for (let i: number = start; i <= end; i++) {
      points.push({
        x: i,
        y: line.start.y,
      });
    }
  } else {
    const start: number = Math.min(line.start.y, line.end.y);
    const end: number = Math.max(line.start.y, line.end.y);
    for (let i: number = start; i <= end; i++) {
      points.push({
        x: line.start.x,
        y: i,
      });
    }
  }

  return points;
}

function getPointsInDiagonalLine(line: Line): Point[] {
  let points: Point[] = [];
  const directionOfX: number = line.end.x - line.start.x > 0 ? 1 : -1;
  const directionOfY: number = line.end.y - line.start.y > 0 ? 1 : -1;
  const length: number = 1 + Math.abs(line.start.x - line.end.x);

  for (let i: number = 0; i < length; i++) {
    const x: number = line.start.x + directionOfX * i;
    const y: number = line.start.y + directionOfY * i;
    points.push({ x, y });
  }

  return points;
}

function pushToMapIfNecessary(map: number[][], point: Point): number[][] {
  let newMap = [...map];
  if (newMap[point.y] === undefined) {
    for (let i: number = newMap.length - 1; i < point.y; i++) {
      newMap.push([]);
    }
  }

  if (newMap[point.y][point.x] === undefined) {
    for (let i: number = newMap[point.y].length - 1; i < point.x; i++) {
      newMap[point.y].push(0);
    }
  }

  return newMap;
}

function getNumberOfDangerousPoints(map: number[][]): number {
  return map
    .map((e: number[]) => {
      return e.filter((elem: number) => elem >= 2).length;
    })
    .reduce((acc: number, curr: number) => acc + curr);
}

const lines: Line[] = data.split('\n').map((e: string) => {
  const points: number[][] = e.split(' -> ').map((elem: string) => {
    const points: string[] = elem.split(',');
    return points.map((element: string) => parseInt(element));
  });

  const line: Line = {
    start: {
      x: points[0][0],
      y: points[0][1],
    },
    end: {
      x: points[1][0],
      y: points[1][1],
    },
  };

  return line;
});

const verticalAndHorizontalLines: Line[] = lines.filter((e: Line) =>
  checkVerticalOrHorizontal(e)
);

const exampleLines: Line[] = [
  { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } },
  { start: { x: 8, y: 0 }, end: { x: 0, y: 8 } },
  { start: { x: 9, y: 4 }, end: { x: 3, y: 4 } },
  { start: { x: 2, y: 2 }, end: { x: 2, y: 1 } },
  { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } },
  { start: { x: 6, y: 4 }, end: { x: 2, y: 0 } },
  { start: { x: 0, y: 9 }, end: { x: 2, y: 9 } },
  { start: { x: 3, y: 4 }, end: { x: 1, y: 4 } },
  { start: { x: 0, y: 0 }, end: { x: 8, y: 8 } },
  { start: { x: 5, y: 5 }, end: { x: 8, y: 2 } },
];

let map: number[][] = [];

verticalAndHorizontalLines.forEach((e: Line) => {
  const linesPoints: Point[] = getPointsInSimpleLine(e);

  linesPoints.forEach((elem: Point) => {
    map = pushToMapIfNecessary(map, elem);
    map[elem.y][elem.x] += 1;
  });
});

const numbersOfDangerousPoints: number = getNumberOfDangerousPoints(map);
// --------------- Part Two ----------------

let newMap = [];

lines.forEach((e: Line) => {
  let linesPoints: Point[] = [];
  if (checkVerticalOrHorizontal(e)) {
    linesPoints = getPointsInSimpleLine(e);
  } else {
    linesPoints = getPointsInDiagonalLine(e);
  }

  linesPoints.forEach((elem: Point) => {
    newMap = pushToMapIfNecessary(newMap, elem);
    newMap[elem.y][elem.x] += 1;
  });
});

const numbersOfDangerousPointsWithDiagonals: number =
  getNumberOfDangerousPoints(newMap);

console.log('Answer One:');
console.log(numbersOfDangerousPoints);

console.log('Answer Two:');
console.log(numbersOfDangerousPointsWithDiagonals);
