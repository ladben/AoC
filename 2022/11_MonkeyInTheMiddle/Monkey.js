import MyNumber from './MyNumber.js';

export default class Monkey {
  constructor (id, stratingItems, operation, operand, test, destTrue, destFalse) {
    this.id = id;
    this.stratingItems = stratingItems;
    this.operand = operand;
    this.test = test;
    this.destTrue = destTrue;
    this.destFalse = destFalse;
    this.itemsInvestigated = 0;

    if (operation === 'addition') {
      this.investigateItem = (item, operand = this.operand) => {
        this.itemsInvestigated++;
        return item.add(new MyNumber(operand));
      }
    }

    if (operation === 'multiplication') {
      this.investigateItem = (item, operand = this.operand) => {
        this.itemsInvestigated++;
        if (operand === 'old') {
          return item.multiply(item);
        }

        return item.multiply(new MyNumber(operand));
      }
    }
  }
}