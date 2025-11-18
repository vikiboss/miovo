import { Random } from './random'

/**
 * Randomly shuffles an array using the Fisher-Yates algorithm.
 *
 * **Key Features:**
 * - Creates a new array (does not mutate original)
 * - Uniform distribution (each permutation equally likely)
 * - Optional seed for reproducible shuffles
 * - Type-safe with readonly array support
 *
 * @param array - Array to shuffle
 * @param seed - Optional seed for reproducible shuffling
 *
 * @returns New shuffled array
 *
 * @example
 * Basic usage:
 * ```ts
 * shuffle([1, 2, 3, 4, 5])       // Returns: [3, 1, 5, 2, 4] (random)
 * shuffle(['a', 'b', 'c'])       // Returns: ['c', 'a', 'b'] (random)
 * ```
 *
 * @example
 * Reproducible with seed:
 * ```ts
 * shuffle([1, 2, 3, 4], 12345)   // Always returns: [3, 1, 4, 2]
 * shuffle([1, 2, 3, 4], 12345)   // Always returns: [3, 1, 4, 2] (same)
 * shuffle([1, 2, 3, 4], 67890)   // Returns different order: [2, 4, 1, 3]
 * ```
 *
 * @example
 * Edge cases:
 * ```ts
 * shuffle([])                    // Returns: []
 * shuffle([1])                   // Returns: [1]
 * shuffle([1, 2])                // Returns: [1, 2] or [2, 1]
 * ```
 */
export function shuffle<T>(array: readonly T[], seed?: number): T[] {
  if (seed !== undefined) {
    const rng = new Random(seed)
    return rng.shuffle(array)
  }

  const result = [...array]

  // Fisher-Yates shuffle algorithm
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}
