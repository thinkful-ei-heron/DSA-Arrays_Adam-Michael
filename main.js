const Array = require('./array');

function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

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

main();
