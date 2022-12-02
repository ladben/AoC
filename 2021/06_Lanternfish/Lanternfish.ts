import * as path from 'path';
import * as fs from 'fs';

const numberOfDays: number = 80;

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/06_Lanternfish.txt'),
  { encoding: 'utf8', flag: 'r' }
);

const dataNumArr: number[] = data.split(',').map((e: string) => parseInt(e));

class lanternfish {
  counter: number;
  constructor(counter: number = 8) {
    this.counter = counter;
  }

  reproduce(array: lanternfish[]) {
    array.push(new lanternfish());
    this.counter = 6;
  }

  liveOneDay(newBornFishArray: lanternfish[]) {
    if (!this.counter) {
      this.reproduce(newBornFishArray);
    } else {
      this.counter--;
    }
  }
}

let initialFishes: lanternfish[] = dataNumArr.map(
  (e: number) => new lanternfish(e)
);

function passOneDay(fishes: lanternfish[]): lanternfish[] {
  let newFishesArr: lanternfish[] = [...fishes];
  let newBornFishesArr: lanternfish[] = [];

  newFishesArr.forEach((e: lanternfish) => {
    e.liveOneDay(newBornFishesArr);
  });

  return [...newFishesArr, ...newBornFishesArr];
}

function getFishPopulation(
  dayPassed: number,
  initalFishes: lanternfish[]
): number {
  let fishes: lanternfish[] = [...initalFishes];

  for (let i: number = 0; i < dayPassed; i++) {
    fishes = passOneDay(fishes);
  }

  return fishes.length;
}

console.log(getFishPopulation(numberOfDays, initialFishes));
