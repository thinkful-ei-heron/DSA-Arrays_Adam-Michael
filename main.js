const _Array = require('./array');

function main() {
  _Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new _Array();

  // Add an item to the array
  arr.push(3); // Array with length 1, capacity 3, ptr 0
  arr.push(5);
  arr.push(15);
  arr.push(19); //resize: Array with capacity 12, ptr 3
  arr.push(45);
  arr.push(10); //final length: 6
  arr.pop();
  arr.pop();
  arr.pop(); //Array with length 3, capacity 12, ptr 3 (does not resize as it shrinks)
  console.log(arr);
  console.log(arr.get(0));
  //empty array
  while (arr.len > 0) {
    arr.pop();
  }
  arr.push('tauhida');
  console.log(arr.get(0)); //NaN
  //explanation: memory is "Float64Array", which I've not heard of, but based on the name it's an array of double-precision floats (which IIRC all JS "Number" types are stored as?)
  //_resize() is used to grow the array's capacity when we haven't reserved enough space for what we're trying to store
  //not useful in this very specific scenario because we're only storing one Array in the entire memory
  //but if we had more than one it avoids problems
  //example: arr1 = Array with length 2 and capacity 3 at ptr 0..let's say it's [0, 1, x] (where x is uninitialized...in this case memory is initialized to zeroes but can't usually assume that)
  //arr2 = new Array() puts arr2 at ptr 3...say it's [9, 8, 7]
  //so memory looks like [0, 1, x, 9, 8, 7, ...]
  //let's make _resize a nop and then arr1.push(2) arr1.push(3)
  //now memory looks like [0, 1, 2, 3, 8, 7, ...]
  //Oops!
}

// main();

function spaceEncode(str) {
  //return str.replace(/ /g, '%20');
  let chars = str.split(''); //O(n)
  chars = chars.reduce((acc, cur) => {
    //runs n times, internals should be O(1), O(n) as a whole
    if (cur === ' ') {
      acc.push(...'%20'); //amortized O(1), one would hope
    } else {
      acc.push(cur); //amortized O(1), one would hope
    }
    return acc;
  }, []);
  return chars.join('');
}
// console.log(spaceEncode('www.thinkful.com /tauh ida parv een'));

function filter(arr, predicate) {
  return arr.reduce((acc, cur) => {
    if (predicate(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);
}

// console.log(filter([4, 5, 6, 7, 4, 5, 6], x => x >= 5));

function maxSum(arr) {
  //O(n^2)
  let maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    //n loops
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      // n, n-1, ..., 1 loops <-- n(n+1)/2 O(n^2)
      sum += arr[j];
      if (sum > maxSum) {
        maxSum = sum;
      }
    }
  }

  return maxSum;
}

// console.log(maxSum([-1, 4, 6, -3, 5, -2, 1]));

//should be O(m + n) (where m and n are lengths of source arrays)
//would be in a language without dynamic array size
//JS apparently might not allocate all required memory when creating an array with a given length
//could make working backwards work like unshift(), which would make it O((m+n)^2)
function mergeSortedArrays(arr1, arr2) {
  let merged = new Array(arr1.length + arr2.length); //we know how big array will be
  let index = merged.length - 1; //will work backwards to allow popping merge results (shouldn't require moving anything around)
  while (index >= 0) {
    //loops m + n times (where m and n are lengths of source arrays),
    let toMerge;
    if (arr1.length > 0) {
      if (arr2.length > 0) {
        //neither source array is empty, need to check which to merge from
        toMerge =
          arr1[arr1.length - 1] > arr2[arr2.length - 1]
            ? arr1.pop() //O(1)
            : arr2.pop();
      } else {
        toMerge = arr1.pop();
      }
    } else {
      toMerge = arr2.pop();
    }
    merged[index] = toMerge;
    index--;
  }
  return merged;
}
// console.log(mergeSortedArrays([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

//O(n^2 * m) where n is length of str and m is length of chars
function removeCharacters(str, chars) {
  let newString = '';
  for (let letter of str) {
    //loop n times
    let match = false;
    for (let char of chars) {
      //loop m times
      if (char === letter) {
        match = true;
      }
    }
    if (!match) {
      newString += letter; //requires newString.length + 1 copy operations since strings are immutable
    }
  }
  return newString;
}
// console.log(
//   removeCharacters('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou')
// );

//O(n^2)
function products(arr = [1, 2, 3]) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    let product = 1;
    for (let j = 0; j < arr.length; j++) {
      if (j !== i) {
        product *= arr[j];
      }
    }
    results.push(product);
  }
  return results;
}
function linearProducts(arr = [1, 2, 3]) {
  let results = [];
  let product = arr.reduce((acc, cur) => acc * cur); //O(n);
  for (let i = 0; i < arr.length; i++) {
    //O(n)
    results[i] = product / arr[i];
  }
  return results;
}

console.log(linearProducts([1, 3, 9, 4]));

//O(m*n) (or O(n^2) for square array)
function arrayShenanigans(arr) {
  //mxn array
  const rows = arr.length;
  const cols = arr[0].length;
  let colsToClear = new Set();
  let rowsToClear = new Set();
  //next block: O(m*n)
  for (let row = 0; row < rows; row++) {
    //m loops
    for (let col = 0; col < cols; col++) {
      //n loops
      console.log(`${row}, ${col}`);
      if (arr[row][col] === 0) {
        colsToClear.add(col);
        rowsToClear.add(row);
      }
    }
  }
  //next block: O(m*n)
  for (let row = 0; row < rows; row++) {
    //m loops
    if (rowsToClear.has(row)) {
      //O(1) check
      arr[row].fill(0); //n writes
      continue; //skip to the next row since we just zeroed *every* column of this row
    }
    for (let col of colsToClear) {
      //up to n loops
      arr[row][col] = 0;
    }
  }
  return arr;
}

let arr2d = [
  [1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1]
];

// console.log(arrayShenanigans(arr2d));

//O(n^2) overall
function rotationChecker(str1, str2) {
  let rotations = new Set();
  for (let i = 0; i < str1.length; i++) {
    //content is O(n), n loops, O(n^2)
    let left = str1.slice(0, i); //i copies
    let right = str1.slice(i); //n - i copies

    rotations.add(right + left); //O(1) addition to set, concat takes n writes
  }
  return rotations.has(str2); //O(1) check
}
// console.log(rotationChecker('amazon', 'azonma'));
// console.log(rotationChecker('amazon', 'azonam'));
