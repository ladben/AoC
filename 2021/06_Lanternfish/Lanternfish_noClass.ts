import * as path from 'path';
import * as fs from 'fs';

const numberOfDays: number = 80;

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/06_Lanternfish.txt'),
  { encoding: 'utf8', flag: 'r' }
);

let initialFishes: number[] = data.split(',').map((e: string) => parseInt(e));
let fishes80Days: number[] = [...initialFishes];

function reproduce(newBornFishArray: number[]): number {
  newBornFishArray.push(8);
  return 6;
}

function liveOneDay(fish: number, newBornFishArray: number[]): number {
  if (!fish) {
    fish = reproduce(newBornFishArray);
  } else {
    fish--;
  }
  return fish;
}

function passOneDay(fishes: number[]): number[] {
  let newBornFishesArr: number[] = [];

  fishes.forEach((e: number, i: number) => {
    fishes[i] = liveOneDay(e, newBornFishesArr);
  });

  return [...fishes, ...newBornFishesArr];
}

function getFishPopulation(dayPassed: number, fishes: number[]): number {
  for (let i: number = 0; i < dayPassed; i++) {
    fishes = passOneDay(fishes);
  }

  return fishes.length;
}

console.log(getFishPopulation(numberOfDays, fishes80Days));
