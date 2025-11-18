/**
 * A seeded pseudo-random number generator using the Mulberry32 algorithm.
 *
 * **Key Features:**
 * - Reproducible random sequences with seed
 * - High-quality random distribution
 * - Fast performance
 * - Multiple utility methods for common use cases
 *
 * @example
 * Basic usage:
 * ```ts
 * const rng = new Random(12345)
 * rng.random()              // Returns: 0.6011037053447217
 * rng.random()              // Returns: 0.2541264604032785
 *
 * // Same seed produces same sequence
 * const rng2 = new Random(12345)
 * rng2.random()             // Returns: 0.6011037053447217 (same as first)
 * ```
 *
 * @example
 * Generate random integers:
 * ```ts
 * const rng = new Random(42)
 * rng.int(1, 10)            // Returns: random integer 1-10 (inclusive)
 * rng.int(0, 100)           // Returns: random integer 0-100 (inclusive)
 * ```
 *
 * @example
 * Array operations:
 * ```ts
 * const rng = new Random(123)
 * const items = ['a', 'b', 'c', 'd']
 *
 * rng.pick(items)           // Returns: random item from array
 * rng.shuffle(items)        // Returns: new shuffled array
 * ```
 *
 * @example
 * Boolean and choice:
 * ```ts
 * const rng = new Random(999)
 * rng.bool()                // Returns: true or false (50% each)
 * rng.bool(0.7)             // Returns: true with 70% probability
 * ```
 */
export class Random {
  private state: number

  /**
   * Creates a new seeded random number generator.
   *
   * @param seed - Seed value for the random number generator (must be non-zero)
   */
  constructor(seed: number) {
    if (seed === 0) {
      throw new Error('Seed cannot be zero')
    }
    this.state = seed >>> 0 // Convert to unsigned 32-bit integer
  }

  /**
   * Generates a random number between 0 (inclusive) and 1 (exclusive).
   * Uses the Mulberry32 algorithm for high-quality pseudo-random numbers.
   *
   * @returns Random number in range [0, 1)
   */
  random(): number {
    this.state = (this.state + 0x6d2b79f5) | 0
    let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  /**
   * Generates a random integer between min (inclusive) and max (inclusive).
   *
   * @param min - Minimum value (inclusive)
   * @param max - Maximum value (inclusive)
   *
   * @returns Random integer in range [min, max]
   */
  int(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min
  }

  /**
   * Generates a random floating point number between min and max.
   *
   * @param min - Minimum value (inclusive)
   * @param max - Maximum value (exclusive)
   *
   * @returns Random number in range [min, max)
   */
  float(min: number, max: number): number {
    return this.random() * (max - min) + min
  }

  /**
   * Randomly picks an element from an array.
   *
   * @param array - Array to pick from
   *
   * @returns Random element from array, or undefined if array is empty
   */
  pick<T>(array: readonly T[]): T | undefined {
    if (array.length === 0) return undefined
    return array[this.int(0, array.length - 1)]
  }

  /**
   * Shuffles an array using Fisher-Yates algorithm with seeded randomness.
   * Returns a new array without mutating the original.
   *
   * @param array - Array to shuffle
   *
   * @returns New shuffled array
   */
  shuffle<T>(array: readonly T[]): T[] {
    const result = [...array]
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.int(0, i)
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }

  /**
   * Generates a random boolean value.
   *
   * @param probability - Probability of returning true (default: 0.5)
   *
   * @returns Random boolean
   */
  bool(probability = 0.5): boolean {
    return this.random() < probability
  }

  /**
   * Resets the generator to its initial seed state.
   *
   * @param seed - New seed value
   */
  reset(seed: number): void {
    if (seed === 0) {
      throw new Error('Seed cannot be zero')
    }
    this.state = seed >>> 0
  }
}

/**
 * Creates a new seeded random number generator.
 *
 * @param seed - Seed value for the random number generator
 *
 * @returns New Random instance
 *
 * @example
 * ```ts
 * const rng = random(12345)
 * rng.random()              // Reproducible random number
 * rng.int(1, 10)            // Reproducible random integer
 * ```
 */
export function random(seed: number): Random {
  return new Random(seed)
}
