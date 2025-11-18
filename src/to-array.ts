/**
 * Converts a value to an array. If the value is already an array, returns it as-is.
 * If the value is null or undefined, returns an empty array.
 * Otherwise, wraps the value in an array.
 *
 * **Key Features:**
 * - Safely converts any value to array form
 * - Handles null and undefined gracefully
 * - Preserves arrays without modification
 * - Type-safe return values
 * - Useful for normalizing function parameters
 *
 * @template T - The type of the value
 *
 * @param value - The value to convert to an array
 *
 * @returns An array containing the value(s)
 *
 * @example
 * Basic usage with single values:
 * ```ts
 * toArray(5)           // Returns: [5]
 * toArray('hello')     // Returns: ['hello']
 * toArray({ id: 1 })   // Returns: [{ id: 1 }]
 * ```
 *
 * @example
 * With arrays (returns as-is):
 * ```ts
 * toArray([1, 2, 3])   // Returns: [1, 2, 3]
 * toArray(['a', 'b'])  // Returns: ['a', 'b']
 * ```
 *
 * @example
 * With null/undefined:
 * ```ts
 * toArray(null)        // Returns: []
 * toArray(undefined)   // Returns: []
 * ```
 *
 * @example
 * Normalizing function parameters:
 * ```ts
 * function addItems(items: string | string[]) {
 *   const itemArray = toArray(items)
 *   itemArray.forEach(item => console.log(item))
 * }
 *
 * addItems('single')           // Works
 * addItems(['one', 'two'])     // Also works
 * ```
 */
export function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) {
    return []
  }

  if (Array.isArray(value)) {
    return value
  }

  return [value]
}
