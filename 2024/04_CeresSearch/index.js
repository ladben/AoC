const fs = require('fs');
// const rawData = fs.readFileSync('shorttestinput.txt', {encoding: 'utf8', flag: 'r'});
// const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

// ----- part one -----

const findStrsInMatrix = ([xPosStart, yPosStart], matrix, strLength) => {
    let row = '';
    let rowReverse = '';
    let col = '';
    let colReverse = '';
    let primDiag = '';
    let primDiagReverse = '';
    let antiDiag = '';
    let antiDiagReverse = '';
    let fullPrimDiag = '';
    let fullAntiDiag = '';

    for (let i = 0; i < strLength; i++) {
        row += matrix[yPosStart][xPosStart + i];
        rowReverse += matrix[yPosStart][xPosStart - i];
        if (matrix[yPosStart + i]) {
            col += matrix[yPosStart + i][xPosStart];
            primDiag += matrix[yPosStart + i][xPosStart + i];
            antiDiag += matrix[yPosStart + i][xPosStart - i];
        }
        if (matrix[yPosStart - i]) {
            colReverse += matrix[yPosStart - i][xPosStart];
            primDiagReverse += matrix[yPosStart - i][xPosStart - i];
            antiDiagReverse += matrix[yPosStart - i][xPosStart + i]
        }
    }

    for (let i = -1 * (strLength - 1); i < strLength; i++) {
        if (matrix[yPosStart + i]) {
            fullPrimDiag += matrix[yPosStart + i][xPosStart + i];
            fullAntiDiag += matrix[yPosStart + i][xPosStart - i];
        }
    }

    return {
        origin: [xPosStart, yPosStart],
        findings: {row, rowReverse, col, colReverse, primDiag, primDiagReverse, antiDiag, antiDiagReverse},
        xFindings: {fullPrimDiag, fullAntiDiag}
    };
}

const findXMASArrFromOrigin = (startPos, matrix) => {
    const findingsFromOrigin = findStrsInMatrix(startPos, matrix, 4);
    const matchArr = Object.keys(findingsFromOrigin.findings).map((key) => {        
        return findingsFromOrigin.findings[key] === 'XMAS';
    });

    return matchArr.filter(val => !!val).length;
}

const strMatchesArr = [];

for (let yIndex = 0; yIndex < rows.length; yIndex++) {
    for (let xIndex = 0; xIndex < rows[0].length; xIndex++) {
        if (rows[yIndex][xIndex] === 'X') {
            strMatchesArr.push(findXMASArrFromOrigin([xIndex, yIndex], rows));
        }
    }
}

const answer_one = strMatchesArr.reduce((acc, curr) => acc + curr);

// ----- part two -----

const findXArrFromOrigin = (startPos, matrix) => {
    const findingsFromOrigin = findStrsInMatrix(startPos, matrix, 2);
    return findingsFromOrigin;
}

const masFindingsArr = [];

for (let yIndex = 0; yIndex < rows.length; yIndex++) {
    for (let xIndex = 0; xIndex < rows[0].length; xIndex++) {
        if (rows[yIndex][xIndex] === 'A') {
            masFindingsArr.push(findXArrFromOrigin([xIndex, yIndex], rows).xFindings);
        }
    }
}

const masMatchesArr = masFindingsArr.map(val => {
    const fullPrimDiagMatch = val.fullPrimDiag === 'MAS' || val.fullPrimDiag === 'SAM';
    const fullAntiDiagMatch = val.fullAntiDiag === 'MAS' || val.fullAntiDiag === 'SAM';

    return fullPrimDiagMatch && fullAntiDiagMatch;
});

const answer_two = masMatchesArr.filter(val => val).length;

// ----- answers -----

console.log(answer_one);
console.log(answer_two);