const fs = require('fs');
const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.replace(/\r/g, "").split('\n');