import { useState, useCallback } from 'react'
import { debounce } from '../../javascript/debounce'

export default function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [searchCount, setSearchCount] = useState(0)

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedValue(value)
      setSearchCount((prev) => prev + 1)
    }, 500),
    []
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Debounce Demo</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What is Debounce?</h3>
        <p className="text-gray-600 mb-4">
          Debouncing is a programming practice that limits the rate at which a function can fire.
          In this example, we're using debounce to limit how often a search function is called
          while the user is typing.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-x-auto">
            {`function debounce(func, delay = 0) {
  let timeout = null;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}`}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Input (with 500ms debounce)
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type something..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-medium text-gray-900 mb-2">Current Value</h4>
            <p className="text-gray-600">{searchTerm || '(empty)'}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-medium text-gray-900 mb-2">Debounced Value</h4>
            <p className="text-gray-600">{debouncedValue || '(empty)'}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">
            Search function called: <span className="font-bold">{searchCount}</span> times
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">How it works:</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Type in the input field above</li>
            <li>Notice how the debounced value updates 500ms after you stop typing</li>
            <li>The search count only increments after the debounce delay</li>
            <li>This prevents excessive API calls or expensive operations</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 