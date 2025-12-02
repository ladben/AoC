const fs = require('fs');
// const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = [rawData.replace(/\r/g, "").split('\n').join(''), "mul(0,0)"];

// ----- part one -----

const regex = /mul\((\d+),(\d+)\)/g;

const matchList = rows.map((row) => {
    const rowMatchList = [];
    let match;

    while ((match = regex.exec(row)) !== null) {
        rowMatchList.push([match[1], match[2]]);
    }

    return rowMatchList;
});

const multipliedList = matchList.map((rowMatchList) => {
    return rowMatchList.map((rowMatch) => {
        return Number(rowMatch[0] * Number(rowMatch[1]));
    });
});

const mulsAddedList = multipliedList.map((multipliedRowList) => {
    return multipliedRowList.reduce((acc, curr) => acc + curr);
});

const answer_one = mulsAddedList.reduce((acc, curr) => acc + curr);

// ----- part two -----

const regexTwo = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

const matchListTwo = rows.map((row) => {
    const rowMatchList = [];
    let match;

    while ((match = regexTwo.exec(row)) !== null) {
        rowMatchList.push([match[0], match[1], match[2]]);
    }

    return rowMatchList;
});

const matchListTwoFiltered = matchListTwo.map((rowMatchList) => {
    let enabled = true;
    const rowMatchListFilterd = [];

    rowMatchList.forEach((rowMatch) => {
        if (rowMatch[0] === "don't()") {
            enabled = false;
        } else if (rowMatch[0] === "do()") {
            enabled = true;
        } else if (enabled) {
            rowMatchListFilterd.push([rowMatch[1], rowMatch[2]]);
        }
    });

    return rowMatchListFilterd;
});

const multipliedListTwo = matchListTwoFiltered.map((rowMatchList) => {
    return rowMatchList.map((rowMatch) => {
        return Number(rowMatch[0] * Number(rowMatch[1]));
    });
});

const mulsAddedListTwo = multipliedListTwo.map((multipliedRowList) => {
    return multipliedRowList.reduce((acc, curr) => acc + curr);
});

const answer_two = mulsAddedListTwo.reduce((acc, curr) => acc + curr);

// ----- answers -----

console.log(answer_one);
console.log(answer_two);