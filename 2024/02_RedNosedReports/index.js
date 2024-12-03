const fs = require('fs');
// const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

// ----- part one -----

const decideIfSafe = (row) => {
    const firstDifference = row[1] - row[0];
    const directionValue = Math.sign(firstDifference);

    if (directionValue === 0) {
        return false;
    }

    let currDifference = 0;

    for (let i in row) {
        const index = Number(i);
        if (row[index + 1]) {
            currDifference = row[index + 1] - row[index];
    
            if (Math.sign(currDifference) !== directionValue) {
                return false;
            }
    
            if (Math.abs(currDifference) < 1 || Math.abs(currDifference) > 3) {
                return false;
            }
        }
    }

    return true;
};

const rowArrList = rows.map(row => row.split(' ').map(numStr => Number(numStr)));
const safeList = rowArrList.map(row => decideIfSafe(row));

const answer_one = safeList.filter(safeRow => safeRow).length;

// ----- part two -----

const dampenedSafeList = rowArrList.map((rowArr) => {
    if (decideIfSafe(rowArr)) {
        return true;
    }

    const droppedRowSafeList = [];

    rowArr.forEach((currNum, index) => {
        const droppedRow = rowArr.filter((e, i) => {
            return i !== index;
        });
    
        droppedRowSafeList.push(decideIfSafe(droppedRow));
    });

    return droppedRowSafeList.some(value => value);
});

const answer_two = dampenedSafeList.filter(safeRow => safeRow).length;

// ----- answers -----

console.log(answer_one);
console.log(answer_two);