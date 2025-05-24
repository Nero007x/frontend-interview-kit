import { useState } from 'react'

export default function ArrayFilterDemo() {
  const [numbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [words] = useState(['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig'])
  const [mixed] = useState([1, 'hello', 2, 'world', 3, '!', 4, null, 5, undefined])

  // Example 1: Filter even numbers
  const evenNumbers = numbers.myFilter(num => num % 2 === 0)
  
  // Example 2: Filter words longer than 5 characters
  const longWords = words.myFilter(word => word.length > 5)
  
  // Example 3: Filter numbers from mixed array
  const onlyNumbers = mixed.myFilter(item => typeof item === 'number')
  
  // Example 4: Filter words starting with 'b'
  const bWords = words.myFilter(word => word.startsWith('b'))
  
  // Example 5: Filter numbers greater than 5
  const greaterThanFive = numbers.myFilter(num => num > 5)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Array Filter Demo</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What is Array Filter?</h3>
        <p className="text-gray-600 mb-4">
          The filter() method creates a new array with all elements that pass the test
          implemented by the provided function. Our custom implementation (myFilter) follows
          the same behavior as the native filter() method.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-x-auto">
            {`Array.prototype.myFilter = function(callback, thisArg) {
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
};`}
          </pre>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 1: Filter Even Numbers</h4>
          <p className="text-gray-600 mb-2">Array: [{numbers.join(', ')}]</p>
          <p className="text-gray-600">Result: [{evenNumbers.join(', ')}]</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`numbers.myFilter(num => num % 2 === 0)`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 2: Filter Long Words</h4>
          <p className="text-gray-600 mb-2">Array: [{words.map(w => `"${w}"`).join(', ')}]</p>
          <p className="text-gray-600">Result: [{longWords.map(w => `"${w}"`).join(', ')}]</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`words.myFilter(word => word.length > 5)`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 3: Filter Numbers from Mixed Array</h4>
          <p className="text-gray-600 mb-2">Array: [{mixed.map(item => 
            item === null ? 'null' : 
            item === undefined ? 'undefined' : 
            typeof item === 'string' ? `"${item}"` : item
          ).join(', ')}]</p>
          <p className="text-gray-600">Result: [{onlyNumbers.join(', ')}]</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`mixed.myFilter(item => typeof item === 'number')`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 4: Filter Words Starting with 'b'</h4>
          <p className="text-gray-600 mb-2">Array: [{words.map(w => `"${w}"`).join(', ')}]</p>
          <p className="text-gray-600">Result: [{bWords.map(w => `"${w}"`).join(', ')}]</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`words.myFilter(word => word.startsWith('b'))`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Example 5: Filter Numbers Greater Than 5</h4>
          <p className="text-gray-600 mb-2">Array: [{numbers.join(', ')}]</p>
          <p className="text-gray-600">Result: [{greaterThanFive.join(', ')}]</p>
          <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
            {`numbers.myFilter(num => num > 5)`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Key Points:</h4>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>Filter creates a new array without modifying the original</li>
            <li>The callback function should return a boolean value</li>
            <li>Our implementation handles sparse arrays correctly</li>
            <li>The callback receives: current value, index, and array</li>
            <li>Filter is commonly used for data transformation and validation</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 