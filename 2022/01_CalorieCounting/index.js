const fs = require('fs');

const data = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'});
let rows = data.split('\n\n');

rows = rows.map(row => row.split('\n').map(calorie => Number(calorie)));

const rowsWithSum = rows.map((row) => {
  const sum = row.reduce((acc, currVal) => acc + currVal);
  return {row, sum};
});

function findMaxSum (data) {
  const sums = data.map(item => item.sum);
  return Math.max(...sums);
}

function findTopXSum (data, x) {
  let currData = [...data];
  let sums = [];
  for (let i = 0; i < x; i++) {
    const currMax = findMaxSum(currData);
    sums.push(currMax);
    currData = currData.filter((element) => {
      return element.sum !== currMax;
    });
  }

  return sums;
}

// ----- 1 -----
const topSum = findMaxSum(rowsWithSum);

// ----- 2 -----
const topThreeSumArr = findTopXSum(rowsWithSum, 3);
const topThreeSum = topThreeSumArr.reduce((acc, curr) => acc + curr);

// part one
console.log('part one:');
console.log(topSum);

// part two
console.log('part two:');
console.log(topThreeSum);
