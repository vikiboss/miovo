import { Random } from './random'

/**
 * Generates a random alphanumeric ID.
 *
 * **Key Features:**
 * - Customizable length
 * - Alphanumeric characters (a-z, A-Z, 0-9)
 * - Fast generation
 * - Optional seed for reproducible results
 * - Suitable for temporary IDs, keys, etc.
 *
 * @param length - Length of the ID to generate (default: 16)
 * @param seed - Optional seed for reproducible random IDs
 *
 * @returns Random alphanumeric string
 *
 * @example
 * Basic usage:
 * ```ts
 * const id = randomId()
 * // Returns: "a1b2c3d4e5f6g7h8"
 * ```
 *
 * @example
 * Custom length:
 * ```ts
 * const shortId = randomId(8)
 * // Returns: "a1b2c3d4"
 *
 * const longId = randomId(32)
 * // Returns: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
 * ```
 *
 * @example
 * Reproducible IDs with seed:
 * ```ts
 * randomId(8, 12345)        // Always returns: "kT6nU9mP"
 * randomId(8, 12345)        // Always returns: "kT6nU9mP" (same as above)
 * randomId(8, 67890)        // Returns different ID: "aB3cD4eF"
 * ```
 */
export function randomId(length = 16, seed?: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  if (seed !== undefined) {
    const rng = new Random(seed)
    for (let i = 0; i < length; i++) {
      result += chars.charAt(rng.int(0, chars.length - 1))
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
  }

  return result
}
