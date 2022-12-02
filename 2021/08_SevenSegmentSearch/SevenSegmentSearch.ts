import * as path from 'path';
import * as fs from 'fs';

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/08_SevenSegmentSearch.txt'),
  { encoding: 'utf8', flag: 'r' }
);

interface InputRow {
  digits: string[];
  output: string[];
  decodingArr?: string[];
  outputValue?: number;
}

const dataArr: InputRow[] = data.split('\n').map((e: string) => {
  const inputRow: string[] = e.split(' | ');
  return {
    digits: inputRow[0].split(' '),
    output: inputRow[1].split(' '),
  };
});

let sumOfUniqueInOutput: number = 0;

dataArr.forEach((e: InputRow) => {
  e.output.forEach((elem: string) => {
    const length: number = elem.length;
    if (length === 2 || length === 4 || length === 3 || length === 7) {
      sumOfUniqueInOutput++;
    }
  });
});

console.log(sumOfUniqueInOutput);

// ---------- Part Two -----------

function decode(decodingArr: string[], code: string): number {
  return decodingArr.indexOf(sortAlphabetical(code));
}

function sortAlphabetical(string: string): string {
  return string.split('').sort().join('');
}

function getDecodingArr(digits: string[]): string[] {
  let digitsWithSortedCode = digits.map((e: string) => sortAlphabetical(e));
  let decodingArr: string[] = Array(10).fill('');
  let segmentA: string = '';
  let segmentC: string = '';
  let segmentE: string = '';
  let segmentF: string = '';

  // Step 0: finding code for 1, 4, 7, 8
  digitsWithSortedCode.forEach((e: string) => {
    if (e.length === 2) {
      decodingArr[1] = sortAlphabetical(e);
    } else if (e.length === 3) {
      decodingArr[7] = sortAlphabetical(e);
    } else if (e.length === 4) {
      decodingArr[4] = sortAlphabetical(e);
    } else if (e.length === 7) {
      decodingArr[8] = sortAlphabetical(e);
    }
  });

  // Step 1: finding segmentA by comapring code for 7 and code for 1
  // (7 has segmentA, 1 does not)
  decodingArr[7].split('').forEach((segmentOfSeven: string) => {
    if (decodingArr[1].indexOf(segmentOfSeven) < 0) {
      segmentA = segmentOfSeven;
    }
  });

  // Step 2: finding code for 6, segmentC by it and segmentF by all of this
  // (numbers of 6 segments are 0,6,9. 0 and 9 have all segments of 1. 6 lacks segmentC.
  // The other segment of 1 is segmentF)
  const digitsOfSixSegments: string[] = digitsWithSortedCode.filter(
    (e: string) => e.length === 6
  );

  digitsOfSixSegments.forEach((e: string) => {
    const codeOfOne: string = decodingArr[1];
    for (let i: number = 0; i < codeOfOne.length; i++) {
      const oneSegmentOfNumberOne: string = codeOfOne[i];
      if (e.indexOf(oneSegmentOfNumberOne) < 0) {
        decodingArr[6] = e;
        segmentC = oneSegmentOfNumberOne;
      }
    }
  });

  decodingArr[1].split('').forEach((e: string) => {
    if (e !== segmentC) {
      segmentF = e;
    }
  });

  // Step 3: finding code for 5
  // (numbers with five segments are 2,3,5. Only number 5 lacks segmentC)
  const digitsOfFiveSegments: string[] = digitsWithSortedCode.filter(
    (e: string) => e.length === 5
  );

  digitsOfFiveSegments.forEach((e: string) => {
    if (e.indexOf(segmentC) < 0) {
      decodingArr[5] = e;
    }
  });

  // Step 4: finding code for 3 and 2, finding segmentE
  // (comparing number 2 and 3, only 3 has segmentF)
  // (the only segment 2 has and 3 does not is segmentE)
  const digitsTwoAndThree: string[] = digitsOfFiveSegments.filter(
    (e: string) => e !== decodingArr[5]
  );

  digitsTwoAndThree.forEach((e: string) => {
    if (e.indexOf(segmentF) < 0) {
      decodingArr[2] = e;
    } else {
      decodingArr[3] = e;
    }
  });

  decodingArr[2].split('').forEach((e: string) => {
    if (decodingArr[3].indexOf(e) < 0) {
      segmentE = e;
    }
  });

  // Step 5: finding code for 0 and 9
  // (9 does not have segmentE)

  const digitsZeroAndNine: string[] = digitsOfSixSegments.filter(
    (e: string) => e !== decodingArr[6]
  );

  digitsZeroAndNine.forEach((e: string) => {
    if (e.indexOf(segmentE) < 0) {
      decodingArr[9] = e;
    } else {
      decodingArr[0] = e;
    }
  });

  return decodingArr;
}

dataArr.forEach((e: InputRow) => {
  e.decodingArr = getDecodingArr(e.digits);

  const digitZero: number = decode(e.decodingArr, e.output[0]);
  const digitOne: number = decode(e.decodingArr, e.output[1]);
  const digitTwo: number = decode(e.decodingArr, e.output[2]);
  const digitThree: number = decode(e.decodingArr, e.output[3]);

  e.outputValue = parseInt(`${digitZero}${digitOne}${digitTwo}${digitThree}`);
});

const outputSum: number = dataArr
  .map((e: InputRow) => e.outputValue)
  .reduce((acc: number, curr: number) => acc + curr);

console.log(outputSum);
