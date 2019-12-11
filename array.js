const Memory = require('./memory');
const mem = new Memory();

class Array {
  constructor() {
    this.len = 0;
    this._cap = 0;
    this.ptr = mem.allocate(this.len);
  }
  _resize(size = (this.len + 1) * Array.RESIZE_RATIO) {
    const oldPtr = this.ptr;
    this.ptr = mem.allocate(size);
    if (this.ptr == null) {
      throw new Error('out of memory');
    }
    mem.copy(this.ptr, oldPtr, this.len);
    mem.free(oldPtr);
    this._cap = size;
  }
  _checkIndex(idx) {
    if (idx < 0 || idx >= this.len) {
      throw new Error('Array index out of bounds');
    }
  }
  push(val) {
    if (!(this.len < this._cap)) {
      this._resize();
    }
    mem.set(this.ptr + this.len, val);
    this.len++;
  }
  pop() {
    return mem.get(this.ptr + --this.len);
  }
  get(idx) {
    this._checkIndex(idx);
    return mem.get(this.ptr + idx);
  }
  insert(idx, val) {
    this._checkIndex(idx);
    if (!(this.len < this._cap)) {
      this._resize();
    }
    mem.copy(this.ptr + idx + 1, this.ptr + idx, this.len - idx);
    mem.set(this.ptr + idx, val);
    this.len++;
  }
  remove(idx) {
    this._checkIndex(idx);
    mem.copy(this.ptr + idx, this.ptr + idx + 1, this.len - idx);
    this.len--;
  }
}

Array.RESIZE_RATIO = 3;

module.exports = Array;
