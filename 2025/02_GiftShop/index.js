const fs = require('fs');
// const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const ranges = rawData.replace(/\r/g, "").split(',').map((range) => {
    const [min, max] = range.split('-').map((str) => parseInt(str, 10));
    return {min, max}
});

// ----- part one -----
const isDoubleNumber = (num) => {
    const str = num.toString();

    const len = str.length;
    if (len % 2 !== 0) {
        return false;
    }

    const half = len / 2;
    const firstHalf = str.slice(0, half);
    const secondHalf = str.slice(half);

    return firstHalf === secondHalf;
}

let invalidIdSum = 0;
ranges.forEach(({min, max}) => {
    for (let id = min; id <= max; id++) {
        if (isDoubleNumber(id)) {
            invalidIdSum += id;
        }
    }
});

const answer_one = invalidIdSum;


// ----- part two -----
const isSeriesNumber = (num) => {
    const str = num.toString();

    const len = str.length;
    for (let blockLen = 1; blockLen <= len / 2; blockLen++) {
        if (len % blockLen !== 0) continue;

        const block = str.slice(0, blockLen);
        let isSeries = true;

        for (let i = blockLen; i < len; i += blockLen) {
            if (str.slice(i, i + blockLen) !== block) {
                isSeries = false;
                break;
            }
        }

        if (isSeries) {
            return true;
        }
    }

    return false;
}

let invalidIdSumTwo = 0;
ranges.forEach(({min, max}) => {
    for (let id = min; id <= max; id++) {
        if (isSeriesNumber(id)) {
            invalidIdSumTwo += id;
        }
    }
});

const answer_two = invalidIdSumTwo;


// ----- answers -----

console.log(answer_one);
console.log(answer_two);