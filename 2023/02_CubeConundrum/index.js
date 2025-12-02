const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');

const startingNumbers = {r: 12, g: 13, b: 14};
const gameInfo = [];

rows.forEach((row) => {
    const regexResult = /Game ([^:]+): /.exec(row)

    let gameValid = true;
    let gameValidSet = false;

    const gameId = regexResult[1] * 1;
    const data = row.replace(regexResult[0], '');
    
    const gameData = [];
    const turns = data.split(';');
    const fewestNumbers = {
        r: 0,
        g: 0,
        b: 0
    }
    turns.forEach((turn) => {
        const redData = /(\d+) red/.exec(turn);
        const greenData = /(\d+) green/.exec(turn);
        const blueData = /(\d+) blue/.exec(turn);

        const redNumber = redData ? redData[1] * 1 : 0;
        const greenNumber = greenData ? greenData[1] * 1 : 0;
        const blueNumber = blueData ? blueData[1] * 1 : 0;

        gameData.push({
            r: redNumber,
            g: greenNumber,
            b: blueNumber
        });

        if (redNumber > startingNumbers.r || greenNumber > startingNumbers.g || blueNumber > startingNumbers.b) {
            if (!gameValidSet) {
                gameValid = false;
                gameValidSet = true;
            }
        }

        if (redNumber > fewestNumbers.r) {
            fewestNumbers.r = redNumber;
        }

        if (greenNumber > fewestNumbers.g) {
            fewestNumbers.g = greenNumber;
        }

        if (blueNumber > fewestNumbers.b) {
            fewestNumbers.b = blueNumber;
        }
    });

    const fewestNumbersPower = fewestNumbers.r * fewestNumbers.g * fewestNumbers.b;

    gameInfo.push({
        id: gameId,
        data: gameData,
        valid: gameValid,
        fewestNumbersPower
    });
});

const validGames = gameInfo.filter((turnInfo) => {
    return turnInfo.valid;
});
const answer1 = validGames.map((turn) => turn.id).reduce((acc, curr) => acc + curr);
console.log(answer1);

const answer2 = gameInfo.map((game) => game.fewestNumbersPower).reduce((acc, curr) => acc + curr);
console.log(answer2);