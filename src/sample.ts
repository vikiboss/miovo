import { Random } from './random'

/**
 * Returns a random element from an array.
 *
 * **Key Features:**
 * - Uniformly random selection
 * - Optional seed for reproducible results
 * - Type-safe return value
 * - Returns undefined for empty arrays
 * - Does not modify the original array
 *
 * @template T - The type of array elements
 *
 * @param array - The array to sample from
 * @param seed - Optional seed for reproducible sampling
 *
 * @returns A random element from the array, or undefined if array is empty
 *
 * @example
 * Basic usage:
 * ```ts
 * const fruits = ['apple', 'banana', 'cherry']
 * const randomFruit = sample(fruits)
 * // Returns one of: 'apple', 'banana', or 'cherry'
 * ```
 *
 * @example
 * Reproducible with seed:
 * ```ts
 * const items = ['a', 'b', 'c', 'd']
 * sample(items, 12345)      // Always returns: 'c'
 * sample(items, 12345)      // Always returns: 'c' (same as above)
 * sample(items, 67890)      // Returns different item: 'a'
 * ```
 *
 * @example
 * With empty array:
 * ```ts
 * const empty: string[] = []
 * const result = sample(empty)
 * // Returns: undefined
 * ```
 *
 * @example
 * Type safety:
 * ```ts
 * const numbers = [1, 2, 3, 4, 5]
 * const randomNum: number | undefined = sample(numbers)
 * ```
 */
export function sample<T>(array: readonly T[], seed?: number): T | undefined {
  if (array.length === 0) {
    return undefined
  }

  if (seed !== undefined) {
    const rng = new Random(seed)
    return rng.pick(array)
  }

  const index = Math.floor(Math.random() * array.length)
  return array[index]
}
