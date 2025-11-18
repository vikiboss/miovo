/**
 * Calculates the sum of all numbers in an array.
 *
 * **Key Features:**
 * - Handles empty arrays (returns 0)
 * - Works with negative numbers
 * - Supports decimal numbers
 *
 * @param numbers - Array of numbers to sum
 *
 * @returns The sum of all numbers, or 0 if array is empty
 *
 * @example
 * Basic usage:
 * ```ts
 * sum([1, 2, 3, 4, 5])        // Returns: 15
 * sum([10, 20, 30])           // Returns: 60
 * ```
 *
 * @example
 * Edge cases:
 * ```ts
 * sum([])                     // Returns: 0
 * sum([5])                    // Returns: 5
 * sum([-1, 1])                // Returns: 0
 * sum([1.5, 2.5, 3])          // Returns: 7
 * ```
 */
export function sum(numbers: readonly number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0)
}
