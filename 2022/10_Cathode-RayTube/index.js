const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.split('\n');

let cycle = 0;
let xRegisterValue = 1;
const signalStrengthList = [];

function checkCycle (cycle) {
  if ((cycle - 20) % 40 === 0) {
    signalStrengthList.push(xRegisterValue * cycle);
  }
}

rows.forEach((row) => {
  cycle++;
  checkCycle(cycle);

  if (row.includes('addx')) {
    const increasement = Number(row.split('addx ')[1]);

    cycle++;
    checkCycle(cycle);
    xRegisterValue += increasement;
  }
});

let cycleTwo = 0;
let spritePosition = 1;
let output = [[], [], [], [], [], []];

function drawCharacter (cycleTwo, spritePosition) {
  const line = Math.ceil(cycleTwo / 40);
  const column = cycleTwo - ((line - 1) * 40);

  output[line - 1][column - 1] = '.';

  if (column >= spritePosition && column <= spritePosition + 2) {
    output[line - 1][column - 1] = '#';
  }
} 

rows.forEach((row) => {
  cycleTwo++
  drawCharacter(cycleTwo, spritePosition);

  if (row.includes('addx ')) {
    const increasement = Number(row.split('addx ')[1]);

    cycleTwo++;
    drawCharacter(cycleTwo, spritePosition);
    spritePosition += increasement;
  }
});

// ----- 1 -----
const sumOfSignalStrenghts = signalStrengthList.reduce((acc, curr) => acc + curr);

// ----- 2 -----
output = output.map((row) => row.join('')).join('\n');

// part one
console.log('part one:');
console.log(sumOfSignalStrenghts);

// part two
console.log('part two:');
console.log(output);