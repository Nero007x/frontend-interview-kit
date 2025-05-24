import { useState } from 'react'
import promiseAll from '../../javascript/promise.all'

type ExampleResult = string[] | number[] | object[] | null

export default function PromiseAllDemo() {
  const [results, setResults] = useState<{ [key: string]: ExampleResult }>({})
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Helper function to create a delayed promise
  const delay = <T,>(ms: number, value: T): Promise<T> => 
    new Promise(resolve => setTimeout(() => resolve(value), ms))

  // Helper function to create a delayed rejection
  const delayedReject = (ms: number, error: string): Promise<never> => 
    new Promise((_, reject) => setTimeout(() => reject(new Error(error)), ms))

  const runExample = async (exampleKey: string) => {
    setIsLoading(true)
    setError('')
    setResults(prev => ({ ...prev, [exampleKey]: null }))

    try {
      let result: ExampleResult
      switch (exampleKey) {
        case 'allResolved': {
          const promises = [
            delay(1000, 'First'),
            delay(2000, 'Second'),
            delay(1500, 'Third')
          ]
          result = await promiseAll(promises)
          break
        }
        case 'withRejection': {
          const promises = [
            delay(1000, 'First'),
            delayedReject(1500, 'Second promise failed'),
            delay(2000, 'Third')
          ]
          result = await promiseAll(promises)
          break
        }
        case 'emptyArray': {
          result = await promiseAll([])
          break
        }
        case 'mixedTypes': {
          const promises = [
            delay(1000, 42),
            delay(1500, { name: 'John', age: 30 }),
            delay(2000, [1, 2, 3])
          ]
          result = await promiseAll(promises)
          break
        }
        case 'allRejected': {
          const promises = [
            delayedReject(1000, 'First promise failed'),
            delayedReject(1500, 'Second promise failed'),
            delayedReject(2000, 'Third promise failed')
          ]
          result = await promiseAll(promises)
          break
        }
        default:
          result = null
      }
      setResults(prev => ({ ...prev, [exampleKey]: result }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const examples = {
    allResolved: {
      title: 'All Promises Resolve',
      description: 'Three promises that resolve with different values after different delays',
      code: `const promises = [
  delay(1000, 'First'),
  delay(2000, 'Second'),
  delay(1500, 'Third')
]
await promiseAll(promises)`
    },
    withRejection: {
      title: 'With Rejection',
      description: 'One promise rejects while others resolve',
      code: `const promises = [
  delay(1000, 'First'),
  delayedReject(1500, 'Second promise failed'),
  delay(2000, 'Third')
]
await promiseAll(promises)`
    },
    emptyArray: {
      title: 'Empty Array',
      description: 'Passing an empty array of promises',
      code: 'await promiseAll([])'
    },
    mixedTypes: {
      title: 'Mixed Types',
      description: 'Promises resolving with different types of values',
      code: `const promises = [
  delay(1000, 42),
  delay(1500, { name: 'John', age: 30 }),
  delay(2000, [1, 2, 3])
]
await promiseAll(promises)`
    },
    allRejected: {
      title: 'All Promises Reject',
      description: 'All promises reject with different errors',
      code: `const promises = [
  delayedReject(1000, 'First promise failed'),
  delayedReject(1500, 'Second promise failed'),
  delayedReject(2000, 'Third promise failed')
]
await promiseAll(promises)`
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Custom Promise.all Demo</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What is Promise.all?</h3>
        <p className="text-gray-600 mb-4">
          Promise.all() takes an iterable of promises and returns a single promise that resolves
          when all of the input promises have resolved, or rejects if any of the input promises
          reject. Our custom implementation (promiseAll) follows the same behavior.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-x-auto">
            {`function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unsolved = iterable.length;

    if (unsolved === 0) {
      resolve(results);
      return;
    }

    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        results[index] = value;
        unsolved -= 1;
        if (unsolved === 0) {
          resolve(results);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}`}
          </pre>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(examples).map(([key, example]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-medium text-gray-900 mb-2">{example.title}</h4>
            <p className="text-gray-600 mb-4">{example.description}</p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <pre className="text-sm overflow-x-auto">
                  {example.code}
                </pre>
              </div>

              <button
                onClick={() => runExample(key)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md text-white ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {isLoading ? 'Running...' : 'Run Example'}
              </button>

              {results[key] !== undefined && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Result:</h5>
                  <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                    {JSON.stringify(results[key], null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Error:</h4>
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Key Points:</h4>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>Returns a promise that resolves when all input promises resolve</li>
            <li>Rejects immediately if any input promise rejects</li>
            <li>Maintains the order of results matching the input array</li>
            <li>Handles empty arrays by resolving with an empty array</li>
            <li>Useful for parallel execution of multiple async operations</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 