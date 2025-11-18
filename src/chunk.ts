/**
 * Splits an array into chunks of specified size.
 *
 * **Key Features:**
 * - Handles empty arrays (returns empty array)
 * - Last chunk may be smaller if array length not divisible by size
 * - Type-safe with readonly array support
 *
 * @param array - Array to split into chunks
 * @param size - Size of each chunk (must be positive integer)
 *
 * @returns Array of chunks
 *
 * @example
 * Basic usage:
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2)      // Returns: [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4], 2)         // Returns: [[1, 2], [3, 4]]
 * chunk(['a', 'b', 'c'], 1)      // Returns: [['a'], ['b'], ['c']]
 * ```
 *
 * @example
 * Edge cases:
 * ```ts
 * chunk([], 2)                   // Returns: []
 * chunk([1, 2, 3], 5)            // Returns: [[1, 2, 3]]
 * chunk([1], 1)                  // Returns: [[1]]
 * ```
 */
export function chunk<T>(array: readonly T[], size: number): T[][] {
  if (size < 1) {
    throw new Error('Chunk size must be at least 1')
  }

  if (array.length === 0) {
    return []
  }

  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size) as T[])
  }
  return result
}
