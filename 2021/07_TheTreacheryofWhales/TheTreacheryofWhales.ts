import * as path from 'path';
import * as fs from 'fs';

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/07_TheTreacheryofWhales.txt'),
  { encoding: 'utf8', flag: 'r' }
);

const dataNumArr: number[] = data.split(',').map((e: string) => parseInt(e));

function getCostOfMovement(
  numArr: number[],
  horizontalPosition: number
): number {
  const movements: number[] = numArr.map((e: number) =>
    Math.abs(e - horizontalPosition)
  );

  return movements.reduce((acc: number, curr: number) => acc + curr);
}

let costsOfMovement: number[] = [];

const minPosition: number = Math.min(...dataNumArr);
const maxPosition: number = Math.max(...dataNumArr);

for (let i: number = minPosition; i <= maxPosition; i++) {
  costsOfMovement.push(getCostOfMovement(dataNumArr, i));
}

console.log(Math.min(...costsOfMovement));

// ------------------ Part Two --------------------

function getSumToZero(num: number): number {
  let sum: number = 0;
  for (let i: number = 0; i <= num; i++) {
    sum += i;
  }

  return sum;
}

function getCostOfMovementUpgraded(
  numArr: number[],
  horizontalPosition: number
): number {
  const movements: number[] = numArr.map((e: number) =>
    getSumToZero(Math.abs(e - horizontalPosition))
  );

  return movements.reduce((acc: number, curr: number) => acc + curr);
}

let costsOfMovementTwo: number[] = [];

const minPositionTwo: number = Math.min(...dataNumArr);
const maxPositionTwo: number = Math.max(...dataNumArr);

for (let i: number = minPosition; i <= maxPosition; i++) {
  costsOfMovementTwo.push(getCostOfMovementUpgraded(dataNumArr, i));
}

console.log(Math.min(...costsOfMovementTwo));
