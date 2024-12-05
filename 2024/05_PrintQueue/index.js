const fs = require('fs');
const rawData = fs.readFileSync('testinput.txt', {encoding: 'utf8', flag: 'r'});
// const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rawDataSplit = rawData.replace(/\r/g, "").split('\n\n');

const orderingRows = rawDataSplit[0].split('\n');
const pageUpdateRows = rawDataSplit[1].split('\n');

// ----- part one -----


const allNumbersInOrderingRows = orderingRows.join('|').split('|').map(val => Number(val));
const allNumbersInOrderingRowsFiltered = allNumbersInOrderingRows.filter((val, index) => allNumbersInOrderingRows.indexOf(val) === index);

let globalPageOrder = [];

allNumbersInOrderingRowsFiltered.forEach((pageToOrder) => {
    console.log('checking ', pageToOrder);

    let minIndexToInsertBefore = null;
    let maxIndexToInsertAfter = null;

    orderingRows.forEach((orderConstraint) => {
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

    console.log('current page order: ', globalPageOrder);
    let indexToInsertInto = 0;

    if (minIndexToInsertBefore === null && maxIndexToInsertAfter !== null) {
        indexToInsertInto = maxIndexToInsertAfter + 1;
    } else if (minIndexToInsertBefore !== null && maxIndexToInsertAfter == null) {
        indexToInsertInto = minIndexToInsertBefore;
    } else {
        indexToInsertInto = Math.ceil((maxIndexToInsertAfter + minIndexToInsertBefore) / 2);
    }

    console.log(`${pageToOrder} should be inserted into index ${indexToInsertInto}`);
    globalPageOrder.splice(indexToInsertInto, 0, pageToOrder);


});

console.log(orderingRows);
// ----- part two -----



// ----- answers -----

// console.log(answer_one);
// console.log(answer_two);