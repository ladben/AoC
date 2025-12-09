const fs = require('fs');
const trawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n').map((row) => row.split(''));

// ----- part one -----
let accessiblePaperNumber = 0;

const getNeighborPaperNumber = (cell, grid) => {
    const deltas = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    const neighbors = deltas.map(([dx, dy]) => [cell[0] + dx, cell[1] + dy]);

    let neighborPaperNumber = 0;
    for (const neighbor of neighbors) {
        const [nx, ny] = neighbor;
        if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length) {
            if (grid[ny][nx] === '@') {
                neighborPaperNumber += 1;
            }
        }
    }
    return neighborPaperNumber;
};

rows.forEach((row, yPos) => {
    row.forEach((cell, xPos) => {
        if (cell === '@') {
            const neighborPaperNumber = getNeighborPaperNumber([xPos, yPos], rows);
            if (neighborPaperNumber < 4) {
                accessiblePaperNumber += 1;
            }
        }
    });
});

const answer_one = accessiblePaperNumber;

// ----- part two -----
let changingGrid = [...rows];
let newGrid = [...rows];
let canContinueRemoving = true;
let removedPaperNumber = 0;
let paperNumberToRemove = 0;

while (canContinueRemoving) {
    paperNumberToRemove = 0
    changingGrid.forEach((row, yPos) => {
        row.forEach((cell, xPos) => {
            if (cell === '@') {
                const neighborPaperNumber = getNeighborPaperNumber([xPos, yPos], changingGrid);
                if (neighborPaperNumber < 4) {
                    newGrid[yPos][xPos] = '.';
                    paperNumberToRemove += 1;
                }
            }
        });
    });

    if (paperNumberToRemove > 0) {
        removedPaperNumber += paperNumberToRemove;
        changingGrid = [...newGrid];
    } else {
        canContinueRemoving = false;
    }
}

const answer_two = removedPaperNumber;

// ----- answers -----

console.log(answer_one);
console.log(answer_two);