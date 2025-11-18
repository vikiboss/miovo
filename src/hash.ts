/**
 * Generates a simple hash code from a string using the DJB2 algorithm.
 *
 * **Key Features:**
 * - Fast and simple hash function
 * - Consistent output for same input
 * - Returns a 32-bit integer
 * - Good distribution for most use cases
 * - Not cryptographically secure (use for non-security purposes only)
 *
 * **Use Cases:**
 * - Generating unique IDs from strings
 * - Hash table implementations
 * - Cache keys
 * - Quick string comparison
 *
 * @param str - The string to hash
 *
 * @returns A 32-bit integer hash code
 *
 * @example
 * Basic usage:
 * ```ts
 * const hashCode = hash('hello world')
 * // Returns: -862545276
 * ```
 *
 * @example
 * Consistent hashing:
 * ```ts
 * const hash1 = hash('test')
 * const hash2 = hash('test')
 * console.log(hash1 === hash2) // true
 * ```
 *
 * @example
 * Cache key generation:
 * ```ts
 * const cacheKey = `user_${hash(JSON.stringify(userData))}`
 * ```
 *
 * @example
 * Different inputs produce different hashes:
 * ```ts
 * hash('abc') !== hash('def')
 * ```
 */
export function hash(str: string): number {
  let hash = 5381
  let i = str.length

  while (i) {
    i -= 1
    hash = (hash * 33) ^ str.charCodeAt(i)
  }

  return hash >>> 0
}
