const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.split('\n');

class RopeEnd {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    };
  }

  move (direction) {
    if (direction === 'U') {
      this.position.y++;
    }

    if (direction === 'D') {
      this.position.y--;
    }

    if (direction === 'L') {
      this.position.x--;
    }

    if (direction === 'R') {
      this.position.x++;
    }
  }

  getDistance (position) {
    const distanceX = Math.abs(this.position.x - position.x);
    const distanceY = Math.abs(this.position.y - position.y);

    return Math.max(distanceX, distanceY);
  }
}

class Head extends RopeEnd {
  constructor () {
    super();
  }
}

class Tail extends RopeEnd {
  constructor () {
    super();
    this.positionsVisited = ['0;0'];
  }

  followHead(headPosition) {
    const distance = this.getDistance(headPosition);
    if (distance > 1) {
      if (headPosition.x < this.position.x) {
        this.move('L');
      }
      if (headPosition.x > this.position.x) {
        this.move('R');
      }
      if (headPosition.y < this.position.y) {
        this.move('D');
      }
      if (headPosition.y > this.position.y) {
        this.move('U');
      }
    }
    const currentTailPosition = `${this.position.x};${this.position.y}`;
    if (this.positionsVisited.indexOf(currentTailPosition) === -1) {
      this.positionsVisited.push(currentTailPosition);
    }
  }
}

// ----- 1 -----
const head = new Head();
const tail = new Tail();

rows.forEach((row) => {
  const operation = row.split(' ');
  const direction = operation[0];
  const iteration = Number(operation[1]);

  for (let i = 0; i < iteration; i++) {
    head.move(direction);
    tail.followHead(head.position);
  }
});

const positionsTailVisited = tail.positionsVisited.length;

// ----- 2 -----
const rope = [];
const ropeHead = new Head();
rope.push(ropeHead);
for (let i = 0; i < 9; i++) {
  const ropeKnot = new Tail();
  rope.push(ropeKnot);
}

rows.forEach((row) => {
  const operation = row.split(' ');
  const direction = operation[0];
  const iteration = Number(operation[1]);

  for (let i = 0; i < iteration; i++) {
    rope.forEach((knot, index) => {
      if (index === 0) {
        knot.move(direction);
      }

      if (index > 0) {
        knot.followHead(rope[index-1].position);
      }
    });
  }
});

const positionsRopeTailVisited = rope[9].positionsVisited.length;

// part one
console.log('part one:');
console.log(positionsTailVisited);

// part two
console.log('part two:');
console.log(positionsRopeTailVisited);