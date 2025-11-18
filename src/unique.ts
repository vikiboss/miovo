/**
 * Creates a new array with duplicate values removed.
 *
 * **Key Features:**
 * - Removes duplicate values using Set
 * - Preserves the order of first occurrence
 * - Works with primitives and objects
 * - Optional custom identity function for complex comparisons
 * - Does not modify the original array
 *
 * @template T - The type of array elements
 *
 * @param array - The array to process
 * @param identity - Optional function to compute unique identity for each element
 *
 * @returns A new array with duplicates removed
 *
 * @example
 * Basic usage with primitives:
 * ```ts
 * const numbers = [1, 2, 2, 3, 4, 4, 5]
 * const result = unique(numbers)
 * // Returns: [1, 2, 3, 4, 5]
 * ```
 *
 * @example
 * With strings:
 * ```ts
 * const words = ['apple', 'banana', 'apple', 'cherry']
 * const result = unique(words)
 * // Returns: ['apple', 'banana', 'cherry']
 * ```
 *
 * @example
 * With identity function:
 * ```ts
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice' }
 * ]
 * const result = unique(users, user => user.id)
 * // Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 * ```
 *
 * @example
 * Case-insensitive uniqueness:
 * ```ts
 * const words = ['Apple', 'banana', 'APPLE', 'Banana']
 * const result = unique(words, word => word.toLowerCase())
 * // Returns: ['Apple', 'banana']
 * ```
 */
export function unique<T>(array: readonly T[], identity?: (item: T) => any): T[] {
  if (!identity) {
    return [...new Set(array)]
  }

  const seen = new Set<any>()
  const result: T[] = []

  for (const item of array) {
    const key = identity(item)
    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    }
  }

  return result
}
