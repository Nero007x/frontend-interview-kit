/**
 * Custom implementation of JSON.stringify
 * @param {*} value - The value to convert to a JSON string
 * @return {string} The JSON string representation of the value
 */
export default function jsonStringify(value) {
  // Handle null and undefined
  if (value === null || value === undefined) {
    return String(value);
  }

  // Handle arrays
  if (Array.isArray(value)) {
    const arrayValues = value.map((item) => jsonStringify(item));
    return `[${arrayValues.join(',')}]`;
  }

  // Handle objects
  if (typeof value === 'object') {
    const objectEntries = Object.entries(value).map(
      ([key, value]) => `"${key}":${jsonStringify(value)}`
    );
    return `{${objectEntries.join(',')}}`;
  }

  // Handle strings
  if (typeof value === 'string') {
    return `"${value.replace(/"/g, '\\"')}"`;
  }

  // Handle numbers, booleans, and other primitives
  return String(value);
}