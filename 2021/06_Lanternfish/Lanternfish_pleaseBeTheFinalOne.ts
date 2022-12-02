import * as path from 'path';
import * as fs from 'fs';

const numberOfDays: number = 256;

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/06_Lanternfish.txt'),
  { encoding: 'utf8', flag: 'r' }
);

const dataNumArr: number[] = data.split(',').map((e: string) => parseInt(e));

let population: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

dataNumArr.forEach((e: number) => {
  population[e]++;
});

for (let i: number = 1; i <= numberOfDays; i++) {
  population = population.map((e: number, j: number) => {
    if (j < 6 || j === 7) {
      return population[j + 1];
    } else if (j === 6) {
      return population[0] + population[7];
    } else if (j === 8) {
      return population[0];
    }
  });
}

console.log(population.reduce((acc: number, curr: number) => acc + curr));
