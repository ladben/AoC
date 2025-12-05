const fs = require('fs');
const trawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

// ----- part one -----
let sumJoltage = 0;

rows.forEach((row) => {
    const batteryArr = row.split('').map(num => parseInt(num));
    const maxJoltage = Math.max(...batteryArr.slice(0, -1));
    const maxJoltageIndex = batteryArr.indexOf(maxJoltage);
    const maxJoltageAfter = Math.max(...batteryArr.slice(maxJoltageIndex + 1));
    sumJoltage += Number(`${maxJoltage}${maxJoltageAfter}`);
});

const answer_one = sumJoltage;

// ----- part two -----
let sumJoltageTwelve = BigInt(0);

const findFollowingMax = (arr, startIndex, foundNumberLength) => {
    const currArr = [...arr];
    let arrToSurvey = [];
    let maxNum = -1;
    let maxNumIndex = -1;

    if (foundNumberLength === 0) {
        arrToSurvey = currArr.slice(0, -11);
    } else if (foundNumberLength < 11) {
        arrToSurvey = currArr.slice(startIndex + 1, -12 + 1 + foundNumberLength);;
    } else {
        arrToSurvey = currArr.slice(startIndex + 1);
    }

    maxNum = Math.max(...arrToSurvey);
    maxNumIndex = arrToSurvey.indexOf(maxNum);

    if (foundNumberLength === 0) {
        return [maxNum, maxNumIndex];
    }

    return [maxNum, maxNumIndex + startIndex + 1];
}

rows.forEach((row) => {
    const maxTwelve = [];
    let currStartIndex = 0;
    const batteryArr = row.split('').map(num => parseInt(num));
    for (let i = 0; i < 12; i++) {
        const [maxNum, maxNumIndex] = findFollowingMax(batteryArr, currStartIndex, i);
        maxTwelve.push(maxNum);
        currStartIndex = maxNumIndex;
    }

    sumJoltageTwelve += BigInt(maxTwelve.join(''));
});

const answer_two = sumJoltageTwelve;


// ----- answers -----

console.log(answer_one);
console.log(answer_two);