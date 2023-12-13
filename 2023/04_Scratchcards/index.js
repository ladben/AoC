const fs = require('fs');
const input = fs.readFileSync('input.json', {encoding: 'utf8', flag: 'r'});

const data = JSON.parse(input);

data.forEach((card) => {
    let matches = 0;
    card.winningNumbers.forEach((winningNumber) => {
        if (card.ownNumbers.indexOf(winningNumber) !== -1) {
            matches += 1;
        }
    });

    card.point = Math.floor(Math.pow(2, matches - 1));
});

const points = data.map((card) => card.point);

const answer1 = points.reduce((acc, curr) => acc + curr);

console.log(answer1);