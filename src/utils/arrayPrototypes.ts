/**
 * Custom implementation of Array.prototype.reduce and Array.prototype.filter
 * @template T, U
 */

declare global {
  interface Array<T> {
    myReduce<U>(
      callback: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
      initialValue?: U
    ): U;
    myFilter(
      callback: (value: T, index: number, array: T[]) => boolean,
      thisArg?: any
    ): T[];
  }
}

Array.prototype.myReduce = function<T, U>(
  callback: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue?: U
): U {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = this;
  const len = arr.length;
  let accumulator: U;
  let startIndex = 0;

  // Handle if initialValue is provided
  if (arguments.length >= 2) {
    accumulator = initialValue as U;
  } else {
    // Find the first defined value in the array
    while (startIndex < len && !(startIndex in arr)) {
      startIndex++;
    }
    if (startIndex >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = arr[startIndex++] as unknown as U;
  }

  // Iterate over remaining elements
  for (let i = startIndex; i < len; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};

Array.prototype.myFilter = function<T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): T[] {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result: T[] = [];
  const arr = this;
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    if (i in arr) { // skip holes in sparse arrays
      const value = arr[i];
      if (callback.call(thisArg, value, i, arr)) {
        result.push(value);
      }
    }
  }

  return result;
};

// Export an empty object to make this a module
export {}; 