const fs = require('fs');
// const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rawDataSplit = rawData.replace(/\r/g, "").split('\n\n');

const orderingRows = rawDataSplit[0].split('\n');
const pageUpdateRows = rawDataSplit[1].split('\n');

// ----- part one -----


const allNumbersInOrderingRows = orderingRows.join('|').split('|').map(val => Number(val));
const allNumbersInOrderingRowsFiltered = allNumbersInOrderingRows.filter((val, index) => allNumbersInOrderingRows.indexOf(val) === index);

let globalPageOrder = [];
let correctPageMidleNumberList = [];

allNumbersInOrderingRowsFiltered.forEach((pageToOrder) => {

    if (pageToOrder === 33) {
        console.log('checking: ', pageToOrder);
        console.log('when global order is: ', globalPageOrder);
    }

    let minIndexToInsertBefore = null;
    let maxIndexToInsertAfter = null;

    orderingRows.forEach((orderConstraint) => {

        if (pageToOrder === 33 && orderConstraint === '33|91') {
            console.log('by constraint: ', orderConstraint);
        }

        const [lesserPage, higherPage] = orderConstraint.split('|').map(val => Number(val));

        if (lesserPage === pageToOrder) {
            const higherPageIndex = globalPageOrder.indexOf(higherPage);
            if (higherPageIndex !== -1) {
                if (minIndexToInsertBefore === null) {
                    minIndexToInsertBefore = higherPageIndex;
                } else {
                    const newValue = Math.min(minIndexToInsertBefore, higherPageIndex)
                    minIndexToInsertBefore = newValue;
                }
            }
        }

        if (higherPage === pageToOrder) {
            const lesserPageIndex = globalPageOrder.indexOf(lesserPage);
            if (lesserPageIndex !== -1) {
                if (maxIndexToInsertAfter === null) {
                    maxIndexToInsertAfter = lesserPageIndex;
                } else {
                    maxIndexToInsertAfter = Math.max(maxIndexToInsertAfter, lesserPageIndex);
                }
            }
        }
    });

    if (pageToOrder === 33) {
        console.log('minIndexToInsertBefore: ', minIndexToInsertBefore);
        console.log('maxIndexToInsertAfter: ', maxIndexToInsertAfter);
    }

    let indexToInsertInto = 0;

    if (minIndexToInsertBefore === null && maxIndexToInsertAfter !== null) {
        indexToInsertInto = maxIndexToInsertAfter + 1;
    } else if (minIndexToInsertBefore !== null && maxIndexToInsertAfter == null) {
        indexToInsertInto = minIndexToInsertBefore;
    } else {
        indexToInsertInto = Math.ceil((maxIndexToInsertAfter + minIndexToInsertBefore) / 2);
    }

    if (pageToOrder === 33) {
        console.log('inserting ', pageToOrder, ' to index ', indexToInsertInto);
    }

    globalPageOrder.splice(indexToInsertInto, 0, pageToOrder);
});

const isCorrectUpdate = (pageRow, correctOrder) => {
    for (index in pageRow) {
        const indexNum = Number(index);
        if (pageRow[indexNum] !== correctOrder[indexNum]) {
            return false;
        }
    }

    return true;
}

pageUpdateRows.forEach((pageUpdateRow) => {
    const pageUpdateRowArr = pageUpdateRow.split(',').map(val => Number(val));
    const correctOrder = globalPageOrder.filter(page => pageUpdateRowArr.indexOf(page) !== -1);
    const correctUpdate = isCorrectUpdate(pageUpdateRowArr, correctOrder);

    if (correctUpdate) {
        correctPageMidleNumberList.push(pageUpdateRowArr[Math.floor(pageUpdateRowArr.length / 2)]);
    }
});

const answer_one = correctPageMidleNumberList.reduce((acc, curr) => acc + curr);

// ----- part two -----



// ----- answers -----

console.log(answer_one);
// console.log(answer_two);