const fs = require('fs');
const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawMonkeys = rawData.split('\n\n');

class Monkey {
  constructor (items, operationType, operationArgument, testArgument, testTrue, testFalse) {
    this.items = items;
    this.operationType = operationType;
    this.operationArgument = operationArgument;
    this.testArgument = testArgument;
    this.testTrue = testTrue;
    this.testFalse = testFalse;
    this.itemsInvestigated = 0;
  }

  investigateItem (item, modified = false) {
    let tempItem = item;
    if (this.operationType === 'addition') {
      tempItem = tempItem + this.operationArgument;
    }
    if (this.operationType === 'multiplication') {
      tempItem = tempItem * this.operationArgument;
    }
    if (this.operationType === 'add-self') {
      tempItem = tempItem + tempItem;
    }
    if (this.operationType === 'multiply-self') {
      tempItem = tempItem * tempItem;
    }
    if (!modified) {
      tempItem = Math.floor(tempItem / 3);
    }

    this.itemsInvestigated++;

    return tempItem;
  }

  testItem (item) {
    const testResult = item % this.testArgument === 0;

    if (testResult) {
      return this.testTrue;
    }

    return this.testFalse;
  }

  throwItem (monkeyList, recipient, item) {
    monkeyList[recipient].items.push(item);
  }

  makeTurn (monkeyList) {
    if (this.items.length) {
      this.items.forEach((item) => {
        let tempItem = item;
        tempItem = this.investigateItem(tempItem);
        const recipient = this.testItem(tempItem);
        this.throwItem(monkeyList, recipient, tempItem);
      });

      this.items = [];
    }
  }
}

const monkeyList = [];
const monkeyListTwo = [];

rawMonkeys.forEach((rawMonkey) => {
  const rows = rawMonkey.split('\n').map((row) => row.trim());

  let items = rows[1].split('Starting items: ')[1].split(', ');
  let operationType = rows[2].split('Operation: new = old ')[1].split(' ')[0];
  let operationArgument = rows[2].split('Operation: new = old ')[1].split(' ')[1];
  let testArgument = rows[3].split('Test: divisible by ')[1];
  let testTrue = rows[4].split('If true: throw to monkey ')[1];
  let testFalse = rows[5].split('If false: throw to monkey ')[1];

  let itemsTwo = rows[1].split('Starting items: ')[1].split(', ');
  let operationArgumentTwo = rows[2].split('Operation: new = old ')[1].split(' ')[1];
  let testArgumentTwo = rows[3].split('Test: divisible by ')[1];

  items = items.map((item) =>  Number(item));
  itemsTwo = itemsTwo.map((item) => BigInt(Number(item)));

  if (operationType === '*') {
    operationType = 'multiplication';
  }
  if (operationType === '+') {
    operationType = 'addition';
  }

  if (operationArgument === 'old' && operationType === 'addition') {
    operationArgument = undefined;
    operationArgumentTwo = undefined;
    operationType = 'add-self';
  }
  if (operationArgument === 'old' && operationType === 'multiplication') {
    operationArgument = undefined;
    operationArgumentTwo = undefined;
    operationType = 'multiply-self';
  }
  if (operationArgument && operationArgument !== 'old') {
    operationArgument = Number(operationArgument);
    operationArgumentTwo = BigInt(Number(operationArgumentTwo));
  }

  testArgument = Number(testArgument);
  testArgumentTwo = BigInt(Number(testArgumentTwo));
  testTrue = Number(testTrue);
  testFalse = Number(testFalse);

  const newMonkey = new Monkey (items, operationType, operationArgument, testArgument, testTrue, testFalse);
  const newMonkeyTwo = new Monkey (itemsTwo, operationType, operationArgumentTwo, testArgumentTwo, testTrue, testFalse);

  monkeyList.push(newMonkey);
  monkeyListTwo.push(newMonkeyTwo);
});

for (let i = 0; i < 20; i++) {
  monkeyList.forEach((monkey) => {
    monkey.makeTurn(monkeyList);
  });
}

// ----- 1 -----
const monkeyScoresDesc = monkeyList.map((monkey) => monkey.itemsInvestigated).sort((a, b) => b - a);
const monkeyBusiness = monkeyScoresDesc[0] * monkeyScoresDesc[1];

// ----- 2 -----


// part one
console.log('part one:');
console.log(monkeyBusiness);

// // part two
// console.log('part two:');
// console.log();