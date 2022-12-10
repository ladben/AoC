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

  putMultiple(stack) {
    const length = stack.elements.length;

    for (let i = 0; i < length; i++) {
      const boxToPut = stack.get();
      this.put(boxToPut);
    }
  }

  getMultiple(quantity) {
    const removedStack = new Stack();

    for (let i = 0; i < quantity; i++) {
      const removedBox = this.get();
      removedStack.put(removedBox);
    }

    return removedStack;
  }

  copyStack() {
    const newStack = new Stack();
    newStack.elements = [...this.elements];

    return newStack;
  }
}

function copyStackArray (arrayToCopy) {
  const newStackArray = [];
  arrayToCopy.forEach(stack => {
    newStackArray.push(stack.copyStack());
  });

  return newStackArray;
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

function performStrategy (stackArray, strategy, multiple = false) {
  let tempStackArr = [...stackArray];

  let {quantity, origin, destination} = strategy;

  if (!multiple) {
    for (let i = 0; i < quantity; i++) {
      const movedElement = tempStackArr[origin - 1].get();
      tempStackArr[destination - 1].put(movedElement);
    }
  }

  if (multiple) {
    const movedStack = tempStackArr[origin - 1].getMultiple(quantity);
    tempStackArr[destination - 1].putMultiple(movedStack);
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

let oldStrategyStackArray = copyStackArray(stackArray);
let newStrategyStackArray = copyStackArray(stackArray);

// ----- 1 -----
strategyArray.forEach(strategy => {
  oldStrategyStackArray = performStrategy(oldStrategyStackArray, strategy);
});

const topCrates = getTopCrates(oldStrategyStackArray);

// ----- 2 -----
strategyArray.forEach(strategy => {
  newStrategyStackArray = performStrategy(newStrategyStackArray, strategy, true);
});

const newStrategyTopCrates = getTopCrates(newStrategyStackArray);

// part one
console.log('part one:');
console.log(topCrates);

// // part two
console.log('part two:');
console.log(newStrategyTopCrates);