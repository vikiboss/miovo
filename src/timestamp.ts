/**
 * Returns the current Unix timestamp in seconds or milliseconds.
 *
 * **Key Features:**
 * - Supports seconds and milliseconds
 * - Clean wrapper around Date.now()
 * - Useful for timestamps, logging, and time tracking
 *
 * @param inSeconds - Return timestamp in seconds instead of milliseconds (default: false)
 *
 * @returns Current timestamp
 *
 * @example
 * Get timestamp in milliseconds:
 * ```ts
 * const now = timestamp()
 * // Returns: 1704067200000
 * ```
 *
 * @example
 * Get timestamp in seconds:
 * ```ts
 * const now = timestamp(true)
 * // Returns: 1704067200
 * ```
 *
 * @example
 * Usage in logging:
 * ```ts
 * console.log(`[${timestamp()}] User logged in`)
 * ```
 */
export function timestamp(inSeconds = false): number {
  const ms = Date.now()
  return inSeconds ? Math.floor(ms / 1000) : ms
}
