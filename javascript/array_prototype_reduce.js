/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {Array<U>}
 */
Array.prototype.myReduce = function(callback, initialValue) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
  
    const arr = this;
    const len = arr.length;
    let accumulator;
    let startIndex = 0;
  
    // Handle if initialValue is provided
    if (arguments.length >= 2) {
      accumulator = initialValue;
    } else {
      // Find the first defined value in the array
      while (startIndex < len && !(startIndex in arr)) {
        startIndex++;
      }
      if (startIndex >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      accumulator = arr[startIndex++];
    }
  
    // Iterate over remaining elements
    for (let i = startIndex; i < len; i++) {
      if (i in arr) {
        accumulator = callback(accumulator, arr[i], i, arr);
      }
    }
  
    return accumulator;
  };