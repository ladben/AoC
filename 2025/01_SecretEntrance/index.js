const fs = require('fs');
// const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input copy.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

// ----- part one and two -----
const rotate = (direction, turnValue, prevValue) => {
    const directionMultiplier = direction === 'L' ? -1 : 1;
    let newValue = prevValue + (turnValue * directionMultiplier);
    let extraTurns = 0;
    if (newValue < 0 || newValue > 99) {
        extraTurns = Math.floor(newValue / 100);
        newValue += (100 * extraTurns * -1);
    }

    let turnsOverZero = 0
    let turnsToZero = direction === 'L' ? prevValue : 100 - prevValue;
    const leftoverTurns = turnValue - turnsToZero
    if (leftoverTurns > 0) {
        prevValue > 0 ? turnsOverZero++ : null;
        (prevValue === 0 && newValue === 0) ? turnsOverZero++ : null;
        turnsOverZero += Math.floor(leftoverTurns / 100);
    }

    if (leftoverTurns === 0) {
        turnsOverZero = 1;
    }
    
    console.log("Prev value: ", prevValue, " Turn: ", direction, turnValue, " New value: ", newValue, " Turns over zero: ", turnsOverZero);
    return [newValue, turnsOverZero];
}

let zeroCount = 0;
let zeroCountInBetween = 0;
let currentValue = 50;

rows.forEach((row, index) => {
    console.log("Round ", index + 1);
    const [_, direction, turnValueString] = row.match(/^([LR])(\d+)$/);
    const turnValue = Number(turnValueString);
    const [newRetrievedValue, extraTurns] = rotate(direction, turnValue, currentValue);
    currentValue = newRetrievedValue;
    if (currentValue === 0) {
        zeroCount++;
    }
    zeroCountInBetween += extraTurns;
});

const answer_one = zeroCount;
const answer_two = zeroCountInBetween;

// ----- answers -----

console.log(answer_one);
console.log(answer_two);