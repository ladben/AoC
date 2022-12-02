import * as path from 'path';
import * as fs from 'fs';

const data: string = fs.readFileSync(
  path.resolve(__dirname, '..Inputs/01_SonarSweep.txt'),
  {
    encoding: 'utf8',
    flag: 'r',
  }
);

function increasingSum(data: number[]): number {
  const inc_dec: number[] = data.map((e: number, i: number) => {
    if (i === 0) {
      return 0;
    } else if (e > data[i - 1]) {
      return 1;
    } else {
      return 0;
    }
  });

  const sum = inc_dec.reduce((acc: number, curr: number) => acc + curr);

  return sum;
}

const dataArr: number[] = data.split('\n').map((e: string) => parseInt(e));
const dataArr2: number[] = dataArr.map((e: number, i: number) => {
  if (i > dataArr.length - 3) {
    return 0;
  } else {
    return e + dataArr[i + 1] + dataArr[i + 2];
  }
});

console.log(increasingSum(dataArr));
console.log(increasingSum(dataArr2));
