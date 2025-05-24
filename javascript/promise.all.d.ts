/**
 * Custom implementation of Promise.all
 * @param iterable - An iterable (such as an Array) of promises
 * @returns A promise that resolves with an array of the resolved values
 */
declare function promiseAll<T>(iterable: Promise<T>[]): Promise<T[]>;

export default promiseAll; 