/**
 * Generates an array of numbers from start to end (exclusive) with optional step.
 *
 * **Key Features:**
 * - Supports both ascending and descending ranges
 * - Configurable step size
 * - End value is exclusive
 * - Type-safe
 *
 * @param start - Starting number (inclusive)
 * @param end - Ending number (exclusive)
 * @param step - Step increment (default: 1 for ascending, -1 for descending)
 *
 * @returns Array of numbers in the specified range
 *
 * @example
 * Basic usage:
 * ```ts
 * range(0, 5)                    // Returns: [0, 1, 2, 3, 4]
 * range(1, 6)                    // Returns: [1, 2, 3, 4, 5]
 * range(0, 10, 2)                // Returns: [0, 2, 4, 6, 8]
 * ```
 *
 * @example
 * Descending ranges:
 * ```ts
 * range(5, 0)                    // Returns: [5, 4, 3, 2, 1]
 * range(10, 0, -2)               // Returns: [10, 8, 6, 4, 2]
 * ```
 *
 * @example
 * Edge cases:
 * ```ts
 * range(0, 0)                    // Returns: []
 * range(5, 5)                    // Returns: []
 * range(0, 1)                    // Returns: [0]
 * ```
 */
export function range(start: number, end: number, step?: number): number[] {
  // Determine default step based on direction
  if (step === undefined) {
    step = start < end ? 1 : -1
  }

  // Validate step direction
  if (step === 0) {
    throw new Error('Step cannot be zero')
  }

  if ((start < end && step < 0) || (start > end && step > 0)) {
    throw new Error('Step direction must match range direction')
  }

  const result: number[] = []

  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i)
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i)
    }
  }

  return result
}
