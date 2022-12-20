const fs = require('fs');
const rawData = fs.readFileSync('input.txt', {encoding: 'utf8', flag: 'r'});
const rows = rawData.split('\n');

class Document {
  constructor (name, size, parentPath) {
    this.name = name;
    this.size = size;
    this.path = parentPath + '/' + name;
    this.parentPath = parentPath;
  }

  setName (name) {
    this.name = name;
  }

  setSize (size) {
    this.size = size;
  }

  setPath (path) {
    this.path = path;
  }

  setParentPath (parentPath) {
    this.parentPath = parentPath;
  }
}

class File extends Document{
  constructor (name, size, parentPath) {
    super(name, size, parentPath);
  }
}

class Dir extends Document {
  constructor (name, parentPath) {
    super(name, 0, parentPath);
  }
}

const documentListOne = {
  dirs: [],
  files: []
}

const rootOne = new Dir('.', '');
rootOne.setPath('');

documentListOne.dirs.push(rootOne);

function createFile (row, currentPath) {
  let [size, name] = row.split(' ');
  size = Number(size);
  
  const newFile = new File(name, size, currentPath);

  return newFile;
}

function createDir (row, currentPath) {
  const name = row.split('dir ')[1];
  const newDir = new Dir(name, currentPath);

  return newDir;
}

function addDocument (row, currentPath) {
  if (row.includes('dir ')) {
    const newDir = createDir(row, currentPath);
    return {
      message: 'dir',
      payload: newDir
    };
  }

  const newFile = createFile(row, currentPath);
  return {
    message: 'file',
    payload: newFile
  };
}

function handleDirChange (row, currentPath) {
  const argument = row.split('$ cd ')[1];

  if (argument === '..') {
    const pathMembers = currentPath.split('/');
    pathMembers.pop();

    return pathMembers.join('/');
  }

  if (argument === '/') {
    return '.';
  }

  return currentPath + '/' + argument;
}

// reading input
let currentPath = '.';
for (row of rows) {
  if (row.includes('$ cd ')) {
    listingCommandRun = false;
    currentPath = handleDirChange(row, currentPath);
  }

  if (!row.includes('$ ls') && !row.includes('$ cd ')) {
    const response = addDocument(row, currentPath);

    if (response.message === 'dir') {
      documentListOne.dirs.push(response.payload);
    }

    if (response.message === 'file') {
      documentListOne.files.push(response.payload);
    }
  }
}

// ----- 1 -----
documentListOne.dirs.forEach((dir) => {
  const dirPath = dir.path;
  let dirSize = 0;

  const fileSizeList = documentListOne.files
    .filter((file) => file.parentPath.includes(dirPath))
    .map((file) => file.size);

  if (fileSizeList.length) {
    dirSize = fileSizeList.reduce((acc, curr) => acc + curr);
  }

  dir.setSize(dirSize);
});

const smallDivSizesSum = documentListOne.dirs
  .filter((dir) => dir.size <= 100000)
  .map((dir) => dir.size)
  .reduce((acc, curr) => acc + curr);

// ----- 2 -----
const spaceTaken = documentListOne.dirs.filter((dir) => dir.name === '.')[0].size;
const unusedSpace = 70000000 - spaceTaken;
const spaceNeeded = 30000000 - unusedSpace;

const dirSizesBigEnough = documentListOne.dirs
  .filter((dir) => dir.size >= spaceNeeded)
  .map((dir) => dir.size);

const dirSizeToDelete = Math.min(...dirSizesBigEnough);

// part one
console.log('part one:');
console.log(smallDivSizesSum);

// // part two
console.log('part two:');
console.log(dirSizeToDelete);