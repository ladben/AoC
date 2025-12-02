const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

const transformWordToDigit = (word) => {
    switch(word) {
        case 'one':
            return '1';
        case 'two':
            return '2';
        case 'three':
            return '3';
        case 'four':
            return '4';
        case 'five':
            return '5';
        case 'six':
            return '6';
        case 'seven':
            return '7';
        case 'eight':
            return '8';
        case 'nine':
            return '9';
        default:
            return word;
    }
}

const findAllIndices = (mainString, searchString) => {
    let indices = [];
    let index = mainString.indexOf(searchString);
  
    while (index !== -1) {
      indices.push({
        matchRule: searchString,
        index: index
      });
      index = mainString.indexOf(searchString, index + 1);
    }
  
    return indices;
  }

const findFirstLastDigit = (string, altered = false) => {
    if (!altered) {
        const regexFirst = /(\d)/;
        const regexLast = /(\d)(?!.*(\d))/;

        const firstDigitResult = regexFirst.exec(string);
        const lastDigitResult = regexLast.exec(string);
    
        if (!firstDigitResult || !lastDigitResult) {
            return null;
        }
    
        const result = {
            first: firstDigitResult[1],
            last: lastDigitResult[1]
        };

        return result;
    }

    const matches = [];
    const matchRules = ['1', 'one', '2', 'two', '3', 'three', '4', 'four', '5', 'five', '6', 'six', '7', 'seven', '8', 'eight', '9', 'nine'];

    matchRules.forEach((rule) => {
        const subMatches = findAllIndices(string, rule);
        if (subMatches.length) {
            matches.push(...subMatches);
        }
    });

    matches.sort((a, b) => {
        return a.index - b.index;
    });

    const firstDigitResult = transformWordToDigit(matches[0].matchRule);
    const lastDigitResult = transformWordToDigit(matches[matches.length - 1].matchRule);

    const result = {
        first: firstDigitResult,
        last: lastDigitResult
    };

    console.log(result);

    return result;

}

const lineNumbers = [];
const altered = true;

rows.forEach((row) => {
    const firstLastDigit = findFirstLastDigit(row, altered);

    if (firstLastDigit) {
        lineNumbers.push((firstLastDigit.first + firstLastDigit.last) * 1);
    }
});
console.log(lineNumbers);
const answer = lineNumbers.reduce((acc, curr) => acc + curr);

console.log(answer);