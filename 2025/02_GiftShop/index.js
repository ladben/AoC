const fs = require('fs');
const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
// const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const ranges = rawData.replace(/\r/g, "").split(',').map((range) => {
    const [min, max] = range.split('-');
    return {min, max}
});

// ----- part one -----
const isDoubleNumber = (str) => {
    if (!str || str[0] === '0') {
        return false;
    }

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
    for (let i = parseInt(min); i <= parseInt(max); i++) {
        // ha a szám 0-val kezdődik, akkor kaka van, mert a Parsolás elveszi a nullákat
    }
});


// ----- part two -----



// ----- answers -----

// console.log(answer_one);
// console.log(answer_two);