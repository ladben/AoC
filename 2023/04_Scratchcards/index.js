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

    card.matches = matches;
    card.point = Math.floor(Math.pow(2, matches - 1));
    card.numberOfCards = 1;
});

const points = data.map((card) => card.point);

const answer1 = points.reduce((acc, curr) => acc + curr);

console.log(answer1);

data.forEach((card, index) => {
    //console.log(`processing card ${index + 1}`);
    for (let i = 0; i < card.numberOfCards; i++) {
        //console.log(`${i + 1} round of processing card ${index + 1}`);
        //console.log(card);
        for (let matchIndex = 0; matchIndex < card.matches; matchIndex++) {
            //console.log(`processing winning number ${matchIndex + 1} of card ${index + 1}`);
            const cardToCopy = data[index + 1 + matchIndex];
            if (cardToCopy) {
                //console.log(`adding 1 to card ${index + 1 + matchIndex + 1}`);
                cardToCopy.numberOfCards += 1;
            }
        }
    }
});

const answer2 = data.map((card) => card.numberOfCards).reduce((acc, curr) => acc + curr);

console.log(answer2);