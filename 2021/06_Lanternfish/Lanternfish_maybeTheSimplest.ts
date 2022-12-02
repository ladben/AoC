import * as path from 'path';
import * as fs from 'fs';

const numberOfDays: number = 80;

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/06_Lanternfish.txt'),
  { encoding: 'utf8', flag: 'r' }
);

let dataNumArr: number[] = data.split(',').map((e: string) => parseInt(e));

for (let i: number = 0; i < numberOfDays; i++) {
  let newlySpawnFishArr: number[] = [];
  dataNumArr = dataNumArr.map((e: number) => {
    if (e === 0) {
      newlySpawnFishArr.push(8);
      return 6;
    } else {
      return e - 1;
    }
  });

  dataNumArr = dataNumArr.concat(newlySpawnFishArr);
}

console.log(dataNumArr.length);
