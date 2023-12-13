const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

const cards = [];

rows.forEach((row) => {
    const regex = /^Card\s*(\d+): /;
    const match = regex.exec(row);

    if (match) {
        const index = match[1] * 1;
        const values = row.split(match[0])[1].split(' | ');

        let [winningNumbers, ownNumbers] = values;
        winningNumbers = winningNumbers.match(/.{1,3}/g).map((number) => number * 1);
        ownNumbers = ownNumbers.match(/.{1,3}/g).map((number) => number * 1);

        cards.push({index, winningNumbers, ownNumbers});
    }
});

console.log(cards);

fs.writeFileSync('input.json', JSON.stringify(cards));