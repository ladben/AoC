const fs = require('fs');
// const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

// ----- part one -----

const leftList = rows.map(row => Number(row.split(' ')[0].trim())).sort();
const rightList = rows.map(row => Number(row.split(' ').pop().trim())).sort();
const distances = [];

leftList.forEach((leftNum, i) => {
    distances.push(Math.abs(leftNum - rightList[i]));
});

const answer_one = distances.reduce((acc, curr) => acc + curr);

// ----- part two -----

const findFrequency = (sortedArray) => {
    const result = [];
    let currentNumber = sortedArray[0];
    let count = 0;

    for (let num of sortedArray) {
        if (num === currentNumber) {
            count++;
        } else {
            result.push([currentNumber, count]);
            currentNumber = num;
            count = 1;
        }
    }

    // Add the last number and its count
    result.push([currentNumber, count]);

    return result;
} 

const leftListFiltered = leftList.filter(leftNum => rightList.indexOf(leftNum) !== -1);
const rightListFiltered = rightList.filter(rightNum => leftList.indexOf(rightNum) !== -1);

const leftListFrequency = findFrequency(leftListFiltered);
const rightListFrequency = findFrequency(rightListFiltered);

const similarities = leftListFrequency.map((leftListFrequencyItem, i) => {
    return leftListFrequencyItem[0] * leftListFrequencyItem[1] * rightListFrequency[i][1];
});

const answer_two = similarities.reduce((acc, curr) => acc + curr);

// ----- answers -----

// console.log(answer_one);
console.log(answer_two);