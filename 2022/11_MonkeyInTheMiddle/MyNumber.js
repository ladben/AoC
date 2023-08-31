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

  normalise () {
    const value = [...this.arrRep];
    while (value[0] === 0) {
      value.shift();
    }

    this.setArrRep(value);
  }

  add (num) {
    let addition = undefined;
    if (typeof num === 'number') {
      addition = new MyNumber(num);
    } else {
      addition = num;
    }

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

  subtract (num) {
    let subtraction = undefined;
    if (typeof num === 'number') {
      subtraction = new MyNumber(num);
    } else {
      subtraction = num;
    }

    const maxLength = Math.max(this.arrRep.length, subtraction.arrRep.length);
    this.extend(maxLength);
    subtraction.extend(maxLength);

    let remainingDigit = 0;
    let result = [];

    for (let i = this.extArrRep.length - 1; i >= 0; i--) {
      const upperDigit = this.extArrRep[i];
      const lowerDigit = subtraction.extArrRep[i] + remainingDigit;
      let difference = 0;

      if (upperDigit >= lowerDigit) {
        difference = upperDigit - lowerDigit;
        remainingDigit = 0;
      } else {
        difference = (10 + upperDigit) - lowerDigit;
        remainingDigit = 1;
      }

      result.unshift(difference);
    }

    this.setArrRep(result);
    this.normalise();
  }

  multiply (num) {
    let multiplier = undefined;
    if (typeof num === 'number') {
      multiplier = new MyNumber(num);
    } else {
      multiplier = num;
    }

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

  divisibleBy(num) {
    // 2
    if (num === 2) {
      return (this.arrRep[this.arrRep.length - 1] % 2) === 0;
    }

    // 3
    else if (num === 3) {
      const sumOfDigits = this.arrRep.reduce((acc, curr) => acc + curr);
      return (sumOfDigits % 3) === 0;
    }

    // 5
    else if (num === 5) {
      return (this.arrRep[this.arrRep.length - 1] % 5) === 0;
    }

    // 7
    else if (num === 7) {
      const reducedNum = new MyNumber(0);
      const firstPart = new MyNumber(0);
      const subtraction = new MyNumber(0);

      reducedNum.setArrRep(this.arrRep);
      while (reducedNum.arrRep.length > 2) {
        const firstPartArr = [...reducedNum.arrRep];
        const lastDigitArr = `${firstPartArr.pop() * 2}`.split('').map(e => Number(e));

        firstPart.setArrRep(firstPartArr);
        subtraction.setArrRep(lastDigitArr);

        firstPart.subtract(subtraction);

        reducedNum.setArrRep(firstPart.arrRep);
      }

      const reducedNumAsNum = Number(reducedNum.arrRep.join(''));
      
      return (reducedNumAsNum % 7) === 0;
    }

    // 11
    else if (num === 11) {
      const reducedNum = new MyNumber(0);
      const firstPart = new MyNumber(0);
      const subtraction = new MyNumber(0);

      reducedNum.setArrRep(this.arrRep);
      while (reducedNum.arrRep.length > 2) {
        const firstPartArr = [...reducedNum.arrRep];
        const lastDigitArr = `${firstPartArr.pop()}`.split('').map(e => Number(e));

        firstPart.setArrRep(firstPartArr);
        subtraction.setArrRep(lastDigitArr);

        firstPart.subtract(subtraction);

        reducedNum.setArrRep(firstPart.arrRep);
      }

      const reducedNumAsNum = Number(reducedNum.arrRep.join(''));
      
      return (reducedNumAsNum % 11) === 0;
    }

    // 13
    else if (num === 13) {
      const reducedNum = new MyNumber(0);
      const firstPart = new MyNumber(0);
      const addition = new MyNumber(0);

      reducedNum.setArrRep(this.arrRep);
      while (reducedNum.arrRep.length > 2) {
        const firstPartArr = [...reducedNum.arrRep];
        const lastDigitArr = `${firstPartArr.pop() * 4}`.split('').map(e => Number(e));

        firstPart.setArrRep(firstPartArr);
        addition.setArrRep(lastDigitArr);

        firstPart.add(addition);

        reducedNum.setArrRep(firstPart.arrRep);
      }

      const reducedNumAsNum = Number(reducedNum.arrRep.join(''));
      
      return (reducedNumAsNum % 13) === 0;
    }

    // 17
    else if (num === 17) {
      const reducedNum = new MyNumber(0);
      const firstPart = new MyNumber(0);
      const subtraction = new MyNumber(0);

      reducedNum.setArrRep(this.arrRep);
      while (reducedNum.arrRep.length > 2) {
        const firstPartArr = [...reducedNum.arrRep];
        const lastDigitArr = `${firstPartArr.pop() * 5}`.split('').map(e => Number(e));

        firstPart.setArrRep(firstPartArr);
        subtraction.setArrRep(lastDigitArr);

        firstPart.subtract(subtraction);

        reducedNum.setArrRep(firstPart.arrRep);
      }

      const reducedNumAsNum = Number(reducedNum.arrRep.join(''));
      
      return (reducedNumAsNum % 17) === 0;
    }

    // 19
    else if (num === 19) {
      const reducedNum = new MyNumber(0);
      const firstPart = new MyNumber(0);
      const addition = new MyNumber(0);

      reducedNum.setArrRep(this.arrRep);
      while (reducedNum.arrRep.length > 2) {
        const firstPartArr = [...reducedNum.arrRep];
        const lastDigitArr = `${firstPartArr.pop() * 2}`.split('').map(e => Number(e));

        firstPart.setArrRep(firstPartArr);
        addition.setArrRep(lastDigitArr);

        firstPart.add(addition);

        reducedNum.setArrRep(firstPart.arrRep);
      }

      const reducedNumAsNum = Number(reducedNum.arrRep.join(''));
      
      return (reducedNumAsNum % 19) === 0;
    }
  }
}