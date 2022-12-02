import * as path from 'path';
import * as fs from 'fs';

const numberOfDays: number = 80;

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/06_Lanternfish.txt'),
  { encoding: 'utf8', flag: 'r' }
);

const dataNumArr: number[] = data.split(',').map((e: string) => parseInt(e));

class fish {
  firstReproduction: number;
  reproduceAt: number;

  constructor(day: number, initial: boolean = false) {
    if (initial) {
      this.firstReproduction = day + 1;
      this.reproduceAt = this.firstReproduction % 7;
    } else {
      this.firstReproduction = day + 1 + 8;
      this.reproduceAt = this.firstReproduction % 7;
    }
  }

  shouldReproduceToday(day: number) {
    if (day === this.firstReproduction) {
      return true;
    } else if (day > this.firstReproduction) {
      return day % 7 === this.reproduceAt;
    } else {
      return false;
    }
  }
}

let fishArr: fish[] = dataNumArr.map((e: number) => new fish(e, true));

for (let i: number = 1; i <= numberOfDays; i++) {
  let newlySpawnFishArr: fish[] = [];
  fishArr.forEach((e: fish) => {
    if (e.shouldReproduceToday(i)) {
      newlySpawnFishArr.push(new fish(i));
    }
  });

  fishArr = fishArr.concat(newlySpawnFishArr);
}

console.log(fishArr.length);
