const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.split('\n');

class Stack {
  constructor() {
    this.elements = [];
  }

  put(newElement) {
    this.elements.unshift(newElement)
  }

  get() {
    const firstElement = this.elements.shift();
    return firstElement;
  }
}

function addLineToStacks (stackArray, line) {
  let tempStackArr = [...stackArray];

  line = line.split('');

  line.forEach((element, index) => {
    if (index % 4 === 0 && element === '[') {
      const pushIndex = index / 4;

      if (tempStackArr[pushIndex]) {
        tempStackArr[pushIndex].elements.push(line[index + 1]);
      }
      
      if (tempStackArr[pushIndex] === undefined) {
        const newStack = new Stack();
        newStack.elements.push(line[index + 1]);
        tempStackArr[pushIndex] = newStack;
      }
    }
  });

  return tempStackArr;
}

function getStrategy (line) {
  const lineArr = line.split(' ');

  const quantity = Number(lineArr[1]);
  const origin = Number(lineArr[3]);
  const destination = Number(lineArr[5]);

  return {quantity, origin, destination};
}

function performStrategy (stackArray, strategy) {
  let tempStackArr = [...stackArray];

  let {quantity, origin, destination} = strategy;

  for (let i = 0; i < quantity; i++) {
    const movedElement = tempStackArr[origin - 1].get();
    tempStackArr[destination - 1].put(movedElement);
  }
  
  return tempStackArr;
}

function getTopCrates (stackArray) {
  let crates = [];
  stackArray.forEach(stack => {
    const firstElement = stack.elements[0];
    crates.push(firstElement);
  });

  return crates.join('');
}

let stackArray = [];
let strategyArray = [];

let addingStacks = true;
let addingStrategy = false;

rows.forEach(row => {
  if (row[1] === 1) {
    addingStacks = false;
  }

  if (row.includes('move')) {
    addingStrategy = true;
  }

  if (addingStacks) {
    stackArray = addLineToStacks(stackArray, row);
  }

  if (addingStrategy) {
    strategyArray.push(getStrategy(row));
  }
});

// ----- 1 -----
strategyArray.forEach(strategy => {
  stackArray = performStrategy(stackArray, strategy);
});

const topCrates = getTopCrates(stackArray);

// ----- 2 -----

// part one
console.log('part one:');
console.log(topCrates);

// // part two
// console.log('part two:');