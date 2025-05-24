/**
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return {Array<T>}
 */
Array.prototype.myFilter = function(callback, thisArg) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
  
    const result = [];
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
  