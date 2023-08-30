export default class MyNumber {
  constructor(num) {
    this.arrRep = `${num}`.split('').map(e => Number(e));
    this.extArrRep = `${num}`.split('').map(e => Number(e));
  }

  setArrRep (valArr) {
    this.arrRep = [...valArr];
    this.extArrRep = [...valArr];
  }

  setExtArrRep (valArr) {
    this.extArrRep = [...valArr];
  }

  resetExtArrRep () {
    this.extArrRep = [...this.arrRep];
  }

  extend (length) {
    this.resetExtArrRep();
    const lengthDiff = length - this.arrRep.length;

    if (lengthDiff > 0) {
      for (let i = 0; i < lengthDiff; i++) {
        this.extArrRep.unshift(0);
      }
    }
  }

  add (num) {
    const addition = new MyNumber(num);

    const maxLength = Math.max(this.arrRep.length, addition.arrRep.length);
    this.extend(maxLength);
    addition.extend(maxLength);

    let remainingDigit = 0;
    let result = [];

    for (let i = this.extArrRep.length - 1; i >= 0; i--) {
      let partialAddition = remainingDigit + this.extArrRep[i] + addition.extArrRep[i];
      partialAddition = `0${partialAddition}`.split('').map(e => Number(e));
      result.unshift(partialAddition[partialAddition.length - 1]);
      remainingDigit = partialAddition[partialAddition.length - 2];
    }
    if (remainingDigit !== 0) {
      result.unshift(remainingDigit);
    }
    
    this.setArrRep(result);
  }

  multiply (num) {
    const multiplier = new MyNumber(num);

    let result = new MyNumber(0);
    for (let i = 0; i < multiplier.arrRep.length; i++) {
      const partialMultiplier = multiplier.arrRep[i];
      let partialMultiplierRemainingDigit = 0;
      let partialResult = [];

      for (let j = this.arrRep.length - 1; j >= 0; j--) {
        let partialAddition = this.arrRep[j]*partialMultiplier + partialMultiplierRemainingDigit;
        partialAddition = `0${partialAddition}`.split('').map(e => Number(e));
        partialResult.unshift(partialAddition[partialAddition.length - 1]);
        partialMultiplierRemainingDigit = partialAddition[partialAddition.length - 2];
      }

      if (partialMultiplierRemainingDigit !== 0) {
        partialResult.unshift(partialMultiplierRemainingDigit);
      }

      result.setArrRep([...result.arrRep, 0]);
      result.add(Number(partialResult.join('')));
    }

    if (result.arrRep[0] === 0) {
      let newValue = [...result.arrRep];
     newValue.shift(0);
      result.setArrRep(newValue);
    }
    
    this.setArrRep(result.arrRep);
  }
}