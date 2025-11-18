/**
 * Checks if a number is within the inclusive range defined by min and max.
 *
 * **Key Features:**
 * - Inclusive range check (min <= value <= max)
 * - Works with negative numbers
 * - Type-safe
 *
 * @param value - The number to check
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 *
 * @returns `true` if value is within range, `false` otherwise
 *
 * @example
 * Basic usage:
 * ```ts
 * inRange(5, 0, 10)    // Returns: true
 * inRange(15, 0, 10)   // Returns: false
 * inRange(-5, 0, 10)   // Returns: false
 * ```
 *
 * @example
 * Boundary values:
 * ```ts
 * inRange(0, 0, 10)    // Returns: true
 * inRange(10, 0, 10)   // Returns: true
 * ```
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}
