import * as path from 'path';
import * as fs from 'fs';

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/03_BinaryDiagnostic.txt'),
  {
    encoding: 'utf8',
    flag: 'r',
  }
);

function generateNumArr(length: number, value: number): number[] {
  let arr: number[] = [];
  for (let i: number = 0; i < length; i++) {
    arr.push(value);
  }

  return arr;
}

function countOnes(data: string[], lengthOfValues: number): number[] {
  let numberOfOnes: number[] = generateNumArr(lengthOfValues, 0);

  data.forEach((e: string) => {
    e.split('')
      .map((e: string) => parseInt(e))
      .forEach((e: number, i: number) => {
        numberOfOnes[i] += e;
      });
  });

  return numberOfOnes;
}

function getRate(
  numberOfOnes: number[],
  numberOfData: number,
  mostLeast: number
): number[] {
  const rate: number[] = numberOfOnes.map((e: number) => {
    const numberOfDigitOne: number = e;
    const numberOfDigitZero: number = numberOfData - e;

    if (numberOfDigitOne >= numberOfDigitZero) {
      return 1;
    } else {
      return 0;
    }
  });

  if (!mostLeast) {
    return invertRate(rate);
  } else {
    return rate;
  }
}

function invertRate(rate: number[]): number[] {
  return rate.map((e: number) => {
    if (e) {
      return 0;
    } else {
      return 1;
    }
  });
}

function getDecimalOfRate(rate: number[]): number {
  const rateStr: string = rate.map((e: number) => e.toString()).join('');
  return parseInt(rateStr, 2);
}

const dataStringArr: string[] = data.split('\n');
const numberOfData: number = dataStringArr.length;
let numberOfOnes: number[] = countOnes(dataStringArr, dataStringArr[0].length);

const gammaRate: number[] = getRate(numberOfOnes, numberOfData, 1);

const epsilonRate: number[] = getRate(numberOfOnes, numberOfData, 0);

console.log('Power Consumption:');
console.log(getDecimalOfRate(gammaRate) * getDecimalOfRate(epsilonRate));

// ------------------ part two --------------------------

function filterData(
  data: string[],
  nthDigitToWatch: number,
  mostLeast: number
): string[] {
  const numberOfOnes: number[] = countOnes(data, data[0].length);
  console.log(
    `Number of ones when watching ${nthDigitToWatch}nth digit: ${numberOfOnes}`
  );
  console.log(`Length of data: ${data.length}`);
  const numberOfOnesInNthPlace: number = numberOfOnes[nthDigitToWatch];
  const numberOfZerosInNthPlace: number = data.length - numberOfOnesInNthPlace;
  let digitToKeep: number;

  if (!mostLeast) {
    if (numberOfOnesInNthPlace < numberOfZerosInNthPlace) {
      digitToKeep = 1;
    } else {
      digitToKeep = 0;
    }
  } else {
    if (numberOfOnesInNthPlace >= numberOfZerosInNthPlace) {
      digitToKeep = 1;
    } else {
      digitToKeep = 0;
    }
  }

  console.log(`digit to keep: ${digitToKeep}`);
  console.log(`Data to filter: ${data}`);

  return data.filter((e: string) => {
    const digitInNthPlaceInElement: number = parseInt(e[nthDigitToWatch]);
    return digitInNthPlaceInElement === digitToKeep;
  });
}

function reduceData(
  data: string[],
  mostLeast: number,
  nthDigitToWatch: number
): string {
  if (data.length === 1) {
    return data[0];
  } else {
    const newData: string[] = filterData(data, nthDigitToWatch, mostLeast);
    return reduceData(newData, mostLeast, nthDigitToWatch + 1);
  }
}

const oxygenGeneratorRating: number[] = reduceData(dataStringArr, 1, 0)
  .split('')
  .map((e: string) => parseInt(e));
const CO2ScrubberRating: number[] = reduceData(dataStringArr, 0, 0)
  .split('')
  .map((e: string) => parseInt(e));

console.log('Life Support Rating:');
console.log(
  getDecimalOfRate(oxygenGeneratorRating) * getDecimalOfRate(CO2ScrubberRating)
);
