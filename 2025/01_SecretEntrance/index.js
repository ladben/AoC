const { dir } = require('console');
const fs = require('fs');
// const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

// ----- part one and two -----
const rotate = (direction, turnValue, prevValue, turn) => {
    const directionMultiplier = direction === 'L' ? -1 : 1;
    const cleanTurnValue = turnValue % 100;
    let turnsOverZero = 0;
    turnsOverZero += Math.floor(turnValue / 100);

    let newValue = prevValue + (cleanTurnValue * directionMultiplier);
    if (newValue < 0 || newValue > 99) {
        turnsOverZero++;
        newValue += (-100 * directionMultiplier);
    }
    if (newValue === 0 && direction === 'L') {
        turnsOverZero++;
    }
    if (prevValue === 0 && direction === 'L') {
        turnsOverZero--;
    }

    return [newValue, turnsOverZero];
}

let zeroCount = 0;
let zeroCountInBetween = 0;
let currentValue = 50;

rows.forEach((row, index) => {
    const [_, direction, turnValueString] = row.match(/^([LR])(\d+)$/);
    const turnValue = Number(turnValueString);
    const [newRetrievedValue, turnsOverZero] = rotate(direction, turnValue, currentValue, (index + 1));
    currentValue = newRetrievedValue;
    zeroCountInBetween += turnsOverZero;
    if (currentValue === 0) {
        zeroCount++;
    }
});

const answer_one = zeroCount;
const answer_two = zeroCountInBetween;

// ----- answers -----

console.log(answer_one);
console.log(answer_two);