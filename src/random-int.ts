import { Random } from './random'

/**
 * Generates a random integer within a specified range (inclusive).
 *
 * **Key Features:**
 * - Inclusive range (both min and max are included)
 * - Uniformly distributed random selection
 * - Optional seed for reproducible results
 * - Type-safe integer return
 * - Handles negative ranges
 * - Swaps min/max if provided in wrong order
 *
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @param seed - Optional seed for reproducible random integers
 *
 * @returns A random integer between min and max (inclusive)
 *
 * @example
 * Basic usage:
 * ```ts
 * const dice = randomInt(1, 6)
 * // Returns: a number between 1 and 6 (inclusive)
 * ```
 *
 * @example
 * Reproducible with seed:
 * ```ts
 * randomInt(1, 10, 12345)   // Always returns: 7
 * randomInt(1, 10, 12345)   // Always returns: 7 (same as above)
 * randomInt(1, 10, 67890)   // Returns different value: 3
 * ```
 *
 * @example
 * With negative numbers:
 * ```ts
 * const temp = randomInt(-10, 10)
 * // Returns: a number between -10 and 10
 * ```
 *
 * @example
 * Same min and max:
 * ```ts
 * const fixed = randomInt(5, 5)
 * // Returns: 5
 * ```
 *
 * @example
 * Reversed range (auto-corrected):
 * ```ts
 * const value = randomInt(10, 1)
 * // Returns: a number between 1 and 10 (range is swapped internally)
 * ```
 */
export function randomInt(min: number, max: number, seed?: number): number {
  // Swap if min > max
  if (min > max) {
    ;[min, max] = [max, min]
  }

  // Generate random integer in range [min, max] inclusive
  if (seed !== undefined) {
    const rng = new Random(seed)
    return rng.int(min, max)
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}
