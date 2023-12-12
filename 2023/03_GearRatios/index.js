const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

const numbers = [];
const stars = [];

rows.forEach((row, rowIndex) => {
    const regex = /\d+/g;
    let match = undefined;
    const matchesWithIndexes = [];

    while ((match = regex.exec(row)) !== null) {
        const matchIndeces = [];
        for (let i = 0; i < match[0].length; i++) {
            matchIndeces.push(match.index + i);
        }
        matchesWithIndexes.push({
            value: match[0],
            row: rowIndex,
            startIndex: match.index,
            partNumber: true,
            valueIndeces: matchIndeces
        });
    }

    numbers.push(...matchesWithIndexes);

    const regexStars = /\*/g;
    let matchStar = undefined;
    const starsInRow = [];
    
    while ((matchStar = regexStars.exec(row)) !== null) {
        const topBorderingIndeces = [];
        if (rowIndex - 1 >= 0) {
            topBorderingIndeces.push({row: rowIndex - 1, column: matchStar.index});

            if (matchStar.index - 1 >= 0) {
                topBorderingIndeces.push({row: rowIndex - 1, column: matchStar.index - 1});
            }

            if (matchStar.index + 1 < row.length) {
                topBorderingIndeces.push({row: rowIndex - 1, column: matchStar.index + 1});
            }
        }

        const bottomBorderingIndeces = [];
        if (rowIndex + 1 < rows.length) {
            bottomBorderingIndeces.push({row: rowIndex + 1, column: matchStar.index});

            if (matchStar.index - 1 >= 0) {
                bottomBorderingIndeces.push({row: rowIndex + 1, column: matchStar.index - 1});
            }

            if (matchStar.index + 1 < row.length) {
                bottomBorderingIndeces.push({row: rowIndex + 1, column: matchStar.index + 1});
            }
        }

        const sideBorderingIndeces = [];
        if (matchStar.index - 1 >= 0) {
            sideBorderingIndeces.push({row: rowIndex, column: matchStar.index - 1});
        }

        if (matchStar.index + 1 < row.length) {
            sideBorderingIndeces.push({row: rowIndex, column: matchStar.index + 1});
        }

        starsInRow.push({
            row: rowIndex,
            index: matchStar.index,
            borderings: [...topBorderingIndeces, ...bottomBorderingIndeces, ...sideBorderingIndeces]
        });
    }

    stars.push(...starsInRow);
});

const findBorderingCharacters = (number) => {
    const borderingCharacters = [];

    const numberStartIndex = number.startIndex;
    const numberEndIndex = number.startIndex + number.value.length - 1;

    const borderStartIndex = numberStartIndex === 0 ? 0 : numberStartIndex - 1;
    const borderEndIndex = numberEndIndex === rows[0].length - 1 ? numberEndIndex : numberEndIndex + 1;

    // top borderings
    if (rows[number.row - 1]) {
        const topBorderings = rows[number.row - 1].split('').slice(borderStartIndex, borderEndIndex + 1);
        borderingCharacters.push(...topBorderings);
    }
    // bottom borderings
    if (rows[number.row + 1]) {
        const bottomBorderings = rows[number.row + 1].split('').slice(borderStartIndex, borderEndIndex + 1);
        borderingCharacters.push(...bottomBorderings);
    }
    // side borderings
    const currRowSplit = rows[number.row].split('');
    // left border
    if (currRowSplit[numberStartIndex - 1]) {
        borderingCharacters.push(currRowSplit[numberStartIndex - 1]);
    }
    // right border
    if (currRowSplit[numberEndIndex + 1]) {
        borderingCharacters.push(currRowSplit[numberEndIndex + 1]);
    }

    return borderingCharacters;
}

numbers.forEach((number) => {
    const bordering = findBorderingCharacters(number).join('');

    if (!/[^.\d]+/g.exec(bordering)) {
        number.partNumber = false;
    }
});

const partNumbers = numbers
    .filter((number) => number.partNumber)
    .map((number) => number.value * 1);

// ---- part one ----

const answer1 = partNumbers.reduce((acc, curr) => acc + curr);

console.log(answer1);

// ---- part two ----

stars.forEach((star) => {
    const borderNumbers = [];
    star.borderings.forEach((bordering) => {
        const found = numbers.find((number) => {
            return number.row === bordering.row && number.valueIndeces.find((valueIndex) => valueIndex === bordering.column);
        });
 
        if (found && borderNumbers.indexOf(found) === -1) {
            borderNumbers.push(found);
        }
    });

    star.borderNumbers = [...borderNumbers];
});

const gearRatioList = stars.filter((star) => star.borderNumbers.length === 2).map((gear) => gear.borderNumbers[0].value * gear.borderNumbers[1].value);

const answer2 = gearRatioList.reduce((acc, curr) => acc + curr);
console.log(answer2);