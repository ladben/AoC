const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.split('\n');

class Tree {
    constructor (posX, posY, height) {
        this.position = {x: posX, y: posY};
        this.height = height;
        this.visibleLeft = false;
        this.visibleTop = false;
        this.visibleRight = false;
        this.visibleBottom = false;
        this.visible = false;
        this.scenicScore = 0;
    }

    setVisibleLeft(visibility) {
        this.visibleLeft = visibility;
    }
    setVisibleTop(visibility) {
        this.visibleTop = visibility;
    }
    setVisibleRight(visibility) {
        this.visibleRight = visibility;
    }
    setVisibleBottom(visibility) {
        this.visibleBottom = visibility;
    }
    setVisible() {
      this.visible = this.visibleLeft || this.visibleTop || this.visibleRight || this.visibleBottom;
    }
    setScenicScore(scenicScore) {
      this.scenicScore = scenicScore;
    }

    positionIsInSameRow(position) {
      return this.position.y === position.y;
    }
    positionIsInSameColumn(position) {
      return this.position.x === position.x;
    }
    positionIsToTheLeft(position) {
      const isToTheLeft = this.position.x > position.x;
      const inSameRow = this.positionIsInSameRow(position);

      return isToTheLeft && inSameRow;
    }
    positionIsToTheTop(position) {
      const isToTheTop = this.position.y > position.y;
      const inSameColumn = this.positionIsInSameColumn(position);
      
      return isToTheTop && inSameColumn;
    }
    positionIsToTheRight(position) {
      const isToTheRight = this.position.x < position.x;
      const inSameRow = this.positionIsInSameRow(position);

      return isToTheRight && inSameRow;
    }
    positionIsToTheBottom(position) {
      const isToTheBottom = this.position.y < position.y;
      const inSameColumn = this.positionIsInSameColumn(position);

      return isToTheBottom && inSameColumn;
    }
}

const globalTreeList = [];

function getVisibility (position, height, direction) {
  const rowToWatch = globalTreeList.filter((tree) => {
    if (direction === 'left') {
      return tree.positionIsToTheRight(position);
    }

    if (direction === 'top') {
      return tree.positionIsToTheBottom(position);
    }

    if (direction === 'right') {
      return tree.positionIsToTheLeft(position);
    }

    if (direction === 'bottom') {
      return tree.positionIsToTheTop(position);
    }

    return false;
  });

  const heightsToWatch = rowToWatch.map((tree) => tree.height);
  const maxHeightToWatch = Math.max(...heightsToWatch);

  return maxHeightToWatch < height;
}

function getScenicScore (position, height, direction) {
  const rowToWatch = globalTreeList.filter((tree) => {
    if (direction === 'left') {
      return tree.positionIsToTheRight(position);
    }

    if (direction === 'top') {
      return tree.positionIsToTheBottom(position);
    }

    if (direction === 'right') {
      return tree.positionIsToTheLeft(position);
    }

    if (direction === 'bottom') {
      return tree.positionIsToTheTop(position);
    }

    return false;
  });

  const blockingTrees = rowToWatch.filter((tree) => tree.height >= height);
  let scenicScore = 0;
  if (direction === 'left') {
    scenicScore = position.x;
  }
  if (direction === 'top') {
    scenicScore = position.y;
  }
  if (direction === 'right') {
    scenicScore = rows[0].length - 1 - position.x;
  }
  if (direction === 'bottom') {
    scenicScore = rows.length - 1 - position.y;
  }

  if (blockingTrees.length) {
    let firstBlockingTree = blockingTrees[blockingTrees.length - 1];
  
    if (direction === 'right' || direction === 'bottom') {
      firstBlockingTree = blockingTrees[0];
    }
  
    if (direction === 'left' || direction === 'right') {
      scenicScore = Math.abs(position.x - firstBlockingTree.position.x);
    }
  
    if (direction === 'top' || direction === 'bottom') {
      scenicScore = Math.abs(position.y - firstBlockingTree.position.y);
    }
  }

  return scenicScore;
}

rows.forEach((row, rowIndex) => {
    const treeList = row.split('');
    treeList.forEach((tree, columnIndex) => {
        const newTree = new Tree(columnIndex, rowIndex, tree);
        globalTreeList.push(newTree);
    });
});

globalTreeList.forEach((tree) => {
  tree.setVisibleLeft(getVisibility(tree.position, tree.height, 'left'));
  tree.setVisibleTop(getVisibility(tree.position, tree.height, 'top'));
  tree.setVisibleRight(getVisibility(tree.position, tree.height, 'right'));
  tree.setVisibleBottom(getVisibility(tree.position, tree.height, 'bottom'));
  tree.setVisible();

  const leftScenicScore = getScenicScore(tree.position, tree.height, 'left');
  const topScenicScore = getScenicScore(tree.position, tree.height, 'top');
  const rightScenicScore = getScenicScore(tree.position, tree.height, 'right');
  const bottomScenicScore = getScenicScore(tree.position, tree.height, 'bottom');
  tree.setScenicScore(leftScenicScore * topScenicScore * rightScenicScore * bottomScenicScore);
});

// ----- 1 -----
const visibleTreeList = globalTreeList.filter((tree) => tree.visible);
const visibleTreeSum = visibleTreeList.length;

// ----- 2 -----
const scenicScores = globalTreeList.map((tree) => tree.scenicScore);
const maxScenicScore = Math.max(...scenicScores);

// part one
console.log('part one:');
console.log(visibleTreeSum);

// part two
console.log('part two:');
console.log(maxScenicScore);