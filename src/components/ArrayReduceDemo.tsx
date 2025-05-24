import { useState } from 'react'

export default function ArrayReduceDemo() {
  const [numbers] = useState([1, 2, 3, 4, 5])
  const [words] = useState(['hello', 'world', 'how', 'are', 'you'])

  // Example 1: Sum numbers
  const sum = numbers.myReduce((acc, curr) => acc + curr, 0)
  
  // Example 2: Multiply numbers
  const product = numbers.myReduce((acc, curr) => acc * curr, 1)
  
  // Example 3: Create object from array
  const numberObject = numbers.myReduce((acc, curr) => ({ ...acc, [curr]: curr }), {})
  
  // Example 4: Concatenate strings
  const sentence = words.myReduce((acc, curr) => `${acc} ${curr}`, '').trim()
  
  // Example 5: Find max number
  const maxNumber = numbers.myReduce((acc, curr) => Math.max(acc, curr), -Infinity)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Array Reduce Demo</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What is Array Reduce?</h3>
        <p className="text-gray-600 mb-4">
          The reduce() method executes a reducer function on each element of the array,
          resulting in a single output value. Our custom implementation (myReduce) follows
          the same behavior as the native reduce() method.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-x-auto">
            {`Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = this;
  const len = arr.length;
  let accumulator;
  let startIndex = 0;

  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    while (startIndex < len && !(startIndex in arr)) {
      startIndex++;
    }
    if (startIndex >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = arr[startIndex++];
  }

  for (let i = startIndex; i < len; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};`}
          </pre>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 1: Sum Numbers</h4>
          <p className="text-gray-600 mb-2">Array: [{numbers.join(', ')}]</p>
          <p className="text-gray-600">Sum: {sum}</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`numbers.myReduce((acc, curr) => acc + curr, 0)`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 2: Multiply Numbers</h4>
          <p className="text-gray-600 mb-2">Array: [{numbers.join(', ')}]</p>
          <p className="text-gray-600">Product: {product}</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`numbers.myReduce((acc, curr) => acc * curr, 1)`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 3: Create Object</h4>
          <p className="text-gray-600 mb-2">Array: [{numbers.join(', ')}]</p>
          <p className="text-gray-600">Result: {JSON.stringify(numberObject, null, 2)}</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`numbers.myReduce((acc, curr) => ({ ...acc, [curr]: curr }), {})`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 4: Concatenate Strings</h4>
          <p className="text-gray-600 mb-2">Array: [{words.map(w => `"${w}"`).join(', ')}]</p>
          <p className="text-gray-600">Result: "{sentence}"</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`words.myReduce((acc, curr) => \`\${acc} \${curr}\`, '').trim()`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 5: Find Maximum</h4>
          <p className="text-gray-600 mb-2">Array: [{numbers.join(', ')}]</p>
          <p className="text-gray-600">Maximum: {maxNumber}</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`numbers.myReduce((acc, curr) => Math.max(acc, curr), -Infinity)`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Key Points:</h4>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>Reduce can transform an array into any value (number, string, object, etc.)</li>
            <li>The initial value is optional but recommended for clarity</li>
            <li>Our implementation handles sparse arrays correctly</li>
            <li>The callback receives: accumulator, current value, index, and array</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 