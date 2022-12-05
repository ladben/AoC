const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.split('\n');

// '2-4' => {min: 2, max: 4}
function getSections (str) {
  const borders = str.split('-');
  const sectionObj = {
    min: Number(borders[0]),
    max: Number(borders[1])
  };

  return sectionObj;
}

// '2-4,6-10' => {e_one: {min: ...}, e_two: {...}}
function getPairInfo (str) {
  const pairs = str.split(',');

  const pairObj = {
    e_one: getSections(pairs[0]),
    e_two: getSections(pairs[1])
  };

  return pairObj;
}

function firstContainsSecond (sectionOne, sectionTwo) {
  return sectionOne.min <= sectionTwo.min && sectionOne.max >= sectionTwo.max;
}

function anyInOther (sectionOne, sectionTwo) {
  const firstInSecond = firstContainsSecond(sectionTwo, sectionOne);
  const secondInFirst = firstContainsSecond(sectionOne, sectionTwo);

  return firstInSecond || secondInFirst;
}

function getOverlap (sectionOne, sectionTwo) {
  let lower = sectionOne;
  let higher = sectionTwo;

  if (sectionTwo.min < sectionOne.min) {
    [lower, higher] = [higher, lower];
  }

  return lower.max >= higher.min;
}

sOne = {
  min: 2,
  max: 10
};

sTwo = {
  min: 11,
  max: 15
};

// console.log(getOverlap(sOne, sTwo));

const data = rows.map(row => getPairInfo(row));

// ----- 1 -----
const containingArr = data.map(pair => anyInOther(pair.e_one, pair.e_two));
const containSum = containingArr.filter(element => element).length;

// ----- 2 -----
const overlapArr = data.map(pair => getOverlap(pair.e_one, pair.e_two));
const overlapSum = overlapArr.filter(element => element).length;

// part one
console.log('part one:');
console.log(containSum);

// part two
console.log('part two:');
console.log(overlapSum);