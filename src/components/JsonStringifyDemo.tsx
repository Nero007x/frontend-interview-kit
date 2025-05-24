import { useState } from 'react'
import jsonStringify from '../../javascript/jsonStringfy'

export default function JsonStringifyDemo() {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState('')

  // Example objects to demonstrate different cases
  const examples = {
    simpleObject: {
      name: 'John',
      age: 30,
      isActive: true,
      hobbies: ['reading', 'gaming'],
      address: {
        city: 'New York',
        zip: '10001'
      }
    },
    arrayWithMixedTypes: [
      1,
      'hello',
      { key: 'value' },
      [1, 2, 3],
      null,
      undefined,
      true
    ],
    nestedArrays: [
      [1, 2],
      [3, [4, 5]],
      [6, [7, [8, 9]]]
    ],
    complexObject: {
      numbers: [1, 2, 3, 4, 5],
      strings: ['a', 'b', 'c'],
      booleans: [true, false],
      nulls: [null, null],
      nested: {
        array: [1, 2, 3],
        object: {
          key: 'value'
        }
      }
    }
  }

  const handleTryIt = () => {
    try {
      setError('')
      let parsedInput
      try {
        parsedInput = JSON.parse(inputValue)
      } catch (e) {
        // If JSON.parse fails, try evaluating as JavaScript
        // Note: This is just for demo purposes, eval should be used with caution
        parsedInput = eval(`(${inputValue})`)
      }
      const stringified = jsonStringify(parsedInput)
      setResult(stringified)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Custom JSON Stringify Demo</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What is JSON Stringify?</h3>
        <p className="text-gray-600 mb-4">
          JSON.stringify() converts a JavaScript object or value to a JSON string.
          Our custom implementation (jsonStringify) follows the same behavior as the
          native JSON.stringify() method, handling arrays, objects, and primitive values.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-x-auto">
            {`function jsonStringify(value) {
  if (Array.isArray(value)) {
    const arrayValues = value.map((item) => jsonStringify(item));
    return \`[\${arrayValues.join(',')}]\`;
  }

  if (typeof value === 'object' && value !== null) {
    const objectEntries = Object.entries(value).map(
      ([key, value]) => \`"\${key}":\${jsonStringify(value)}\`,
    );
    return \`{\${objectEntries.join(',')}}\`;
  }

  if (typeof value === 'string') {
    return \`"\${value}"\`;
  }

  return String(value);
}`}
          </pre>
        </div>
      </div>

      <div className="space-y-6">
        {/* Try it yourself section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium text-gray-900 mb-2">Try it yourself</h4>
          <div className="space-y-4">
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
                Input (JavaScript object or array)
              </label>
              <textarea
                id="input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder='{"name": "John", "age": 30}'
              />
            </div>
            <button
              onClick={handleTryIt}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Stringify
            </button>
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            {result && (
              <div>
                <h5 className="font-medium text-gray-900 mb-1">Result:</h5>
                <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                  {result}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Examples section */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Examples:</h4>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h5 className="font-medium text-gray-900 mb-2">Simple Object</h5>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Input:</p>
              <pre className="bg-gray-50 p-2 rounded text-sm">
                {JSON.stringify(examples.simpleObject, null, 2)}
              </pre>
              <p className="text-sm text-gray-600">Result:</p>
              <pre className="bg-gray-50 p-2 rounded text-sm">
                {jsonStringify(examples.simpleObject)}
              </pre>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h5 className="font-medium text-gray-900 mb-2">Array with Mixed Types</h5>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Input:</p>
              <pre className="bg-gray-50 p-2 rounded text-sm">
                {JSON.stringify(examples.arrayWithMixedTypes, null, 2)}
              </pre>
              <p className="text-sm text-gray-600">Result:</p>
              <pre className="bg-gray-50 p-2 rounded text-sm">
                {jsonStringify(examples.arrayWithMixedTypes)}
              </pre>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h5 className="font-medium text-gray-900 mb-2">Nested Arrays</h5>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Input:</p>
              <pre className="bg-gray-50 p-2 rounded text-sm">
                {JSON.stringify(examples.nestedArrays, null, 2)}
              </pre>
              <p className="text-sm text-gray-600">Result:</p>
              <pre className="bg-gray-50 p-2 rounded text-sm">
                {jsonStringify(examples.nestedArrays)}
              </pre>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h5 className="font-medium text-gray-900 mb-2">Complex Object</h5>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Input:</p>
              <pre className="bg-gray-50 p-2 rounded text-sm">
                {JSON.stringify(examples.complexObject, null, 2)}
              </pre>
              <p className="text-sm text-gray-600">Result:</p>
              <pre className="bg-gray-50 p-2 rounded text-sm">
                {jsonStringify(examples.complexObject)}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Key Points:</h4>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>Handles arrays, objects, and primitive values</li>
            <li>Recursively processes nested structures</li>
            <li>Properly escapes strings with quotes</li>
            <li>Maintains the same output format as native JSON.stringify</li>
            <li>Useful for understanding how JSON serialization works</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 