const fs = require('fs');
const trawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = trawData.replace(/\r/g, "").split('\n');

// ----- part one -----



// ----- part two -----



// ----- answers -----

// console.log(answer_one);
// console.log(answer_two);