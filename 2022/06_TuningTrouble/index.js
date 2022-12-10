const fs = require('fs');
const data = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});

function isAMarker (arr, markerLength) {
  const filteredArr = arr.filter((e, i) => {
    return arr.indexOf(e) === i;
  });

  return (filteredArr.length === markerLength);
}

function getMarkerIndex (string, markerLength) {
  const stringArr = string.split('');
  let markerIndex = 0;
  let markerIndexFound = false;

  stringArr.forEach((letter, index) => {
    if (index >= markerLength - 1 && !markerIndexFound) {
      const isMarker = isAMarker(stringArr.slice(index - (markerLength - 1), index + 1), markerLength);
      if (isMarker) {
        markerIndex = index;
        markerIndexFound = true;
      }
    }
  });

  return markerIndex + 1;
}

// ----- 1 -----
const startOfPacketMarker = getMarkerIndex(data, 4);

// ----- 2 -----
const startOfMessageMarker = getMarkerIndex(data, 14);

// part one
console.log('part one:');
console.log(startOfPacketMarker);

// // part two
console.log('part two:');
console.log(startOfMessageMarker);