import * as path from 'path';
import * as fs from 'fs';

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/02_Dive.txt'),
  {
    encoding: 'utf8',
    flag: 'r',
  }
);

interface Movement {
  direction: string;
  value: number;
}

interface Position {
  horizontal: number;
  depth: number;
  aim: number;
}

const dataArr: Movement[] = data.split('\n').map((e: string) => {
  const value = e.split(' ');
  const movement: Movement = {
    direction: value[0],
    value: parseInt(value[1]),
  };
  return movement;
});

let startPosition: Position = {
  horizontal: 0,
  depth: 0,
  aim: 0,
};

function getFinalPosition(
  startingPosition: Position,
  data: Movement[]
): Position {
  let newPosition: Position = { ...startingPosition };

  data.forEach((e: Movement) => {
    switch (e.direction) {
      case 'forward':
        newPosition.horizontal += e.value;
        break;
      case 'down':
        newPosition.depth += e.value;
        break;
      case 'up':
        newPosition.depth -= e.value;
        break;
      default:
        console.log('Error in input');
    }
  });

  return newPosition;
}

function getFinalPositionWithAim(
  startPosition: Position,
  dataArr: Movement[]
): Position {
  let newPosition: Position = { ...startPosition };
  dataArr.forEach((e: Movement) => {
    switch (e.direction) {
      case 'forward':
        newPosition.horizontal += e.value;
        newPosition.depth += e.value * newPosition.aim;
        break;
      case 'down':
        newPosition.aim += e.value;
        break;
      case 'up':
        newPosition.aim -= e.value;
        break;
      default:
        console.log('Error in input');
    }
  });

  return newPosition;
}

const finalPositionOne: Position = getFinalPosition(startPosition, dataArr);
const finalPositionTwo: Position = getFinalPositionWithAim(
  startPosition,
  dataArr
);

const answerOne: number = finalPositionOne.depth * finalPositionOne.horizontal;
const answerTwo: number = finalPositionTwo.depth * finalPositionTwo.horizontal;

console.log(`Answer one is ${answerOne}`);
console.log(`Answer two is ${answerTwo}`);
