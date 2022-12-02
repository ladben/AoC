const fs = require('fs');

const data = fs.readFileSync('./input.txt', {encoding: 'utf8', flag: 'r'});
const rows = data.split('\n').map((row) => row.split(' '));

function getChoicePoints (choice) {
  if (choice === 'A' || choice === 'X') {
    return 1;
  }

  if (choice === 'B' || choice === 'Y') {
    return 2;
  }

  if (choice === 'C' || choice === 'Z') {
    return 3;
  }

  return 0;
}

function decideOutCome (round) {
  const elf = round[0];
  const player = round[1];

  const elfScore = getChoicePoints(elf);
  const playerScore = getChoicePoints(player);

  let battlePoints = null;
  const roundStr = round.join('');

  if (roundStr === 'AZ' || roundStr === 'BX' || roundStr === 'CY') {
    battlePoints = 0;
  }
  
  if (roundStr === 'AX' || roundStr === 'BY' || roundStr === 'CZ') {
    battlePoints = 3;
  }

  if (roundStr === 'AY' || roundStr === 'BZ' || roundStr === 'CX') {
    battlePoints = 6;
  }

  if (battlePoints === null) {
    console.log('warning at ' + round);
  }


  return battlePoints + playerScore;
}

function changePlayerChoice (round) {
  let elf = round[0];
  let player = round[1];
  const roundStr = round.join('');

  if (roundStr === 'BX' || roundStr === 'AY' || roundStr === 'CZ') {
    player = 'X';
  }

  if (roundStr === 'CX' || roundStr === 'BY' || roundStr === 'AZ') {
    player = 'Y';
  }

  if (roundStr === 'AX' || roundStr === 'CY' || roundStr === 'BZ') {
    player = 'Z';
  }

  return [elf, player];
}


// ----- 1 -----
const roundScores = rows.map(row => decideOutCome(row));
const totalScore = roundScores.reduce((acc, curr) => acc + curr);

// ----- 2 -----
const modifiedRows = rows.map(row => changePlayerChoice(row));
const modifiedRoundScores = modifiedRows.map(modifiedRow => decideOutCome(modifiedRow));
const modifiedTotalScore = modifiedRoundScores.reduce((acc, curr) => acc + curr);

// part one
console.log('part one:');
console.log(totalScore);

// part two
console.log('part two:');
console.log(modifiedTotalScore);