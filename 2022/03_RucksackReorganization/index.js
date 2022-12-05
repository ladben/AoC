const fs = require('fs');

const data = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = data.split('\n');
const halvedRows = rows.map((row) => halveString(row));

function getCharacterPriority (char) {
  const charCode = char.charCodeAt(0);
  // charCode of 'A' is 65, priority needs to be 27 (so 65 - 38)
  let priority = charCode - 38;

  // charCode of 'a' is 97, priority needs to be 1 (so 97 - 96)
  if (charCode - 97 >= 0) {
    priority = charCode - 96;
  }

  return priority;
}

function halveString (str) {
  const halfIndex = str.length / 2;
  const firstHalf = str.slice(0, halfIndex);
  const secondHalf = str.slice(halfIndex);

  return {firstHalf, secondHalf};
}

function getCommonCharacter (str1, str2, str3 = null) {
  let commonCharacter = null;
  if (str3 === null) {
    str3 = str2;
  }

  str1.split('').forEach((character) => {
    if (commonCharacter === null && str2.includes(character) && str3.includes(character)) {
      commonCharacter = character;
    }
  });

  return commonCharacter;
}

// ----- 1 -----
const commonCharacters = halvedRows.map(row => getCommonCharacter(row.firstHalf, row.secondHalf));
const priorities = commonCharacters.map(character => getCharacterPriority(character));
const prioritiesSum = priorities.reduce((acc, curr) => acc + curr);

// ----- 2 -----
const groupPriorities = rows.map((e, i) => {
  if (i%3 === 0) {
    const commonCharacter = getCommonCharacter(e, rows[i+1], rows[i+2]);
    return getCharacterPriority(commonCharacter);
  }

  return 0;
});

const groupPrioritiesSum = groupPriorities.reduce((acc, curr) => acc + curr);

// part one
console.log('part one:');
console.log(prioritiesSum);

// part two
console.log('part two:');
console.log(groupPrioritiesSum);